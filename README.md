# ATM CLI Simulator!
Hi! this is **ATM Simulator** built with nodejs cli. 

## Library
Just using few library to make this project.
>**Typescript**
>**json-server**
>**inquirer**
>**axios**
>**jest**
>**chalk**
>**clear**
>**figlet**

## Script

To run the dummy server apps:
> `pnpm run start:server`

To run the cli client apps:
>`pnpm run start:cli`

To run the cli client test:
>`pnpm run test:cli`

# Behind the code


## SQL
This project using `json-server` to emulate the sql.
> |logged_session|type|
> |-|-|
> |id|number|
> |username|string|
 
> |users|type|
> |-|-|
> |id|number|
> |username|number|

> |transactions|type|
> |-|-|
> |id|number|
> |user_id|number|
> |amount|number|
> |type|enum('deposit','withdraw','transfer') |
> |to_id| number//undifiend | 
 