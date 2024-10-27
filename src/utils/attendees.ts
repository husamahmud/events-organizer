'use server'

import { memoize } from 'nextjs-better-unstable-cache'
import { eq, sql } from 'drizzle-orm'

import { db } from '@/db/db'
import { attendees, events, rsvps } from '@/db/schema'
import { delay } from '@/utils/delay'

export const getAttendeesCountForDashboard = memoize(
  async (userId: string) => {
    await delay(2500)
    // throw new Error('oops')

    const counts = await db
      .select({
        totalAttendees: sql<number>`count(distinct ${attendees.id})`,
      })
      .from(events)
      .leftJoin(rsvps, eq(rsvps.eventId, events.id))
      .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
      .where(eq(events.createdById, userId))
      .groupBy(events.id)
      .execute()

    return counts.reduce((acc, count) => acc + count.totalAttendees, 0)
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:attendees'],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'dashboard:attendees',
  },
)
