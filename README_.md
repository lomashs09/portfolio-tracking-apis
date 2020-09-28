#### PORTFOLIO TRACKING APIS #####

Steps to setup and start project 

1. CLONE THE PROJECT
2. install the dependencies by doing `npm install`
3. connect to the database
4. start the server by `npm start`


##### APIs details #####

This project is hosted on heroku 

The baseUrl is https://lomash-portfolio-tracking.herokuapp.com

For demo purpose one test user is already created  with userId as :

userId : c40853a4-bc7b-4b34-870d-466b5785d21e


1. Get all tickerSymbols : 

{baseUrl}/api/v1/tickerSymbols 

Method : 'GET'



2. Get all trades for a user:

{baseUrl}/api/v1/users/:userId/trades

Method: 'GET'

This API will give all the past trades that the user has done.

in params - `userId` (type : UUID)

demo userId is  mentioned above.



3. ADD a trade or SELL shares for a user:

{baseUrl}/api/v1/users/:userId/trades

Method: 'POST'

This API will record a trade for a user.

in params - `userId`(type: UUID)

in body - `tickerSymbolId` (type uuid) : the identifier for the ticker, which a user can get by calling api no 1. REQUIRED FIELD

in body - `amount` (type positive number) : The amount for which the ticker is bought or sold. REQUIRED

in body - `shares` (type positive number) : The total number of shares which are bought or sold. REQUIRED

in body - `tradeType` (type STRING) : It can have two values [`BUY`, `SELL`]. This is to identify the type of trade. REQUIRED




4. UPDATE a trade :

{baseUrl}/api/v1/users/:userId/trades/:tradeId

METHOD : 'PUT'

This API will update the values for a trade.

in params - `userId`(type: UUID)

in params - `tradeId` (type : UUID)

in body - `amount` (type positive number) : The amount for which the ticker is bought or sold.

in body - `shares` (type positive number) : The total number of shares which are bought or sold.





5. GET holdings of a user: 

{baseUrl}/api/v1/users/:userId/holdings

METHOD : 'GET'

in params - `userId`(type: UUID)

This API will return the holdings for a user.





6. GET returns of a user:

{baseUrl}/api/v1/users/:userId/returns

METHOD : 'GET'

in params - `userId`(type: UUID)

This API will return returns of a user.

To calculate the returns the current price for ticker is taken as 100 Rupees.





* All the apis are open to use.

* Validations has been done for all the APIs input.











