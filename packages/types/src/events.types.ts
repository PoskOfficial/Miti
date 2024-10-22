export interface CalendarEventsResult {
  events: CalendarEvent[];
}

export interface CalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  creator: Creator;
  organizer: Creator;
  start: End;
  end: End;
  iCalUID: string;
  colorId?: string;
  sequence: number;
  reminders?: Reminders;
  eventType: string;
  calendarId: string;
  accessRole: string;
  calendarSummary: string;
  description?: string;
  transparency?: string;
  visibility?: string;
  location?: string;
  recurrence?: string[];
  recurringEventId?: string;
  originalStartTime?: End;
}

export interface Creator {
  email: string;
  self?: boolean;
  displayName?: string;
}

export interface End {
  dateTime?: string;
  timeZone?: string;
  date?: string;
}

export interface Reminders {
  useDefault: boolean;
  overrides?: Override[];
}

export interface Override {
  method: string;
  minutes: number;
}
