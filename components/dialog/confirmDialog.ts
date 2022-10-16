// @ts-nocheck
import { queue } from "./SharedDialog";

export type ConfirmDialogProps = {
  title?: string;
  body?: string;
  confirmText?: string;
  cancelText?: string;
  dialogProps?: any;
  acceptanceText?: string;
  rejectionText?: string;
};

export default function confirmDialog({
  title,
  body,
  dialogProps,
  acceptanceText,
  rejectionText,
}: ConfirmDialogProps) {
  return queue.add({
    type: "confirm",
    title,
    body,
    dialogProps,
    acceptanceText: acceptanceText || "Confirm",
    rejectionText: rejectionText || "Cancel",
  });
}
