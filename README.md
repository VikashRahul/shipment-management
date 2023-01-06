# SHIPMENT MANAGEMENT FORM

A shipment management form which takes the shipment no., description,source,destination,shipping date and expected delivery date as input and stores this data in a JSONPower database.

The form have three disabled control buttons namely Sve, Update, Reset and all other fields except shipment no.,which acts as our primary key, are also disabled.

When the user enter the shipment no. it checks whether this shipment no. exist in the database or not  

  (1) If shipment no. is not present then it enables the save and reset buttons and allow the user to enter the data in other fields and validates the data. When the user hit the save button the data get stored in our database and form regain its initial state.
  
  (2) If shipment no. is already present then the form fetches the corresponding data of all other fields and enables the update button to allow user to change any field and update that in the database. 
