# Timetrack-back

App for work account.

## API

resource obj `work: {
 id: number,
 hours: number,
 date: Date,
 archived: boolean,
 description: string
}`

get all `GET` - `/api/works`, response: work[]

get one `GET` - `/api/works/{id}`, response: work

create `POST` - `/api/works` request body: work, response: work

update `PUT` - `/api/works/{id}` request body: work, response: work

update `DELETE` - `/api/works/{id}` response: `workId`
