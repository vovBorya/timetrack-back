# Timetrack-back

App for work account.

## API

resouse obj `work: {
 id: number,
 hours: number,
 date: Date,
 archived: boolean,
 description: string
}`

get all `GET` - `/`, response: work[]

get one `GET` - `/?id={id}`, response: work

create `POST` - `/` requset body: work, response: work

update `PUT` - `/` requset body: work, response: work

update `DELETE` - `/?id={id}` response: `workId`
