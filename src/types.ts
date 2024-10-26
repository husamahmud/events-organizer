import { users, events, attendees, rsvps } from '@/db/schema'

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
type UserSelect = Pick<typeof users.$inferSelect, 'id' | 'email' | 'createdAt'>

export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert

export type Attendee = typeof attendees.$inferSelect
export type NewAttendee = typeof attendees.$inferInsert

export type RSVP = typeof rsvps.$inferSelect
export type NewRSVP = typeof rsvps.$inferInsert

export type SignupResponse = {
  user: UserSelect
  token: string
}

export const EventStatus = {
  DRAFT: 'draft',
  LIVE: 'live',
  STARTED: 'started',
  ENDED: 'ended',
  CANCELED: 'canceled',
} as const

export type EventStatus = typeof EventStatus[keyof typeof EventStatus]

export const RSVPStatus = {
  GOING: 'going',
  NOT_GOING: 'not-going',
  MAYBE: 'maybe',
} as const

export type RSVPStatus = typeof RSVPStatus[keyof typeof RSVPStatus]

export type UserWithEvents = User & {
  events: Event[]
}

export type EventWithDetails = Event & {
  createdBy: User
  rsvps: RSVP[]
}

export type RSVPWithDetails = RSVP & {
  attendee: Attendee
  event: Event
}

export type AttendeeWithRSVPs = Attendee & {
  rsvps: RSVP[]
}

export type RegisterState = {
  message?: string
}

export type FormState = {
  message: string | null
  status?: string
}
