import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { notification } from "@/types";
import { AlertModalProps } from "@/types";

export default function AlertModal({ notification }: AlertModalProps) {
  return (
    <Alert variant={notification.variant}>
      <AlertTitle>{notification.title}</AlertTitle>
      <AlertDescription>{notification.description}</AlertDescription>
    </Alert>
  );
}
