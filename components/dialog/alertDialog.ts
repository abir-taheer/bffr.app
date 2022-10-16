// @ts-nocheck
import { queue } from "./SharedDialog";
import { ReactPropTypes } from "react";

export type AlertDialogProps = {
    title?: string;
    body?: string;
    dialogProps?: ReactPropTypes
};

export default function alertDialog({ title, body, dialogProps }: AlertDialogProps) {
  return queue.add({
    type: "alert",
    title,
    body,
    dialogProps,
  });
}
