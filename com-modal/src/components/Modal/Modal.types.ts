export type ScheduleType =
  | "no repeat"
  | "specific date"
  | "daily"
  | "weekly"
  | null;

export type ModalData = Record<string, string | Record<string, string>>;

export interface ModalProps {
  onSubmitClick: (dat: ModalData) => any;
  onCancelClick: () => any;
}
