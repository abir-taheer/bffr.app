import { ResolverFunction } from "../../../graphql";
import Activity from "../../../database/models/Activity";
import { ApolloError, ForbiddenError } from "apollo-server-micro";
import Task from "../../../database/models/Task";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getTasks: ResolverFunction<null, { activityId: number }> = async (
  _,
  { activityId },
  { user }
) => {
  if (!user) {
    throw new ForbiddenError("You need to be signed in");
  }

  console.log(activityId);
  const activity = await Activity.findOne({
    where: {
      id: activityId,
    },
  });

  if (!activity) {
    throw new ApolloError("There is no activity with that id");
  }

  let existingTasks = await Task.findAll({
    where: {
      activityId,
      userId: user.id,
    },
  });

  if (!existingTasks.length) {
    // Generate the tasks
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt:
        "Write a list of 9 things to take photos of when " + activity.prompt,
      temperature: 0.1,
      max_tokens: 348,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const choices = response.data.choices;

    if (choices?.length) {
      const opts =
        choices[0]?.text
          ?.split("\n")
          .map((a) => a.trim())
          .filter(Boolean)
          .map((a) => a.replace(/\d\.\s+/g, "")) || [];

      existingTasks = await Promise.all(
        opts.map((text, index) =>
          Task.create({
            createdAt: undefined,
            deletedAt: undefined,
            updatedAt: undefined,
            order: index,
            userId: user.id,
            activityId: activityId,
            action: text,
          })
        )
      );
    }
  }

  return existingTasks;
};

export default getTasks;
