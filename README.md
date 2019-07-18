# 4shers-server

## User Validation 

Fullname  : 
  - Required : **true**
  - Validation Pattern : **Alphabet** & **Space** Only
Username  :
  - Required : **true**
  - Unique : **true**
  - Validation Pattern :
    1. Minimum Length : 6
    2. **Alphabet** and ('.', '_', '-') **Symbols**
Email     :
  - Required : **true**
  - Unique : **true**
  - Validation Pattern : Email Format
Password  :
  - Required : **true**
  - Validation Pattern :
    1. Minimum Length : 8
    2. **AlphaNumeric**