
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, default|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|string|null: false, foreign_key: true|
|image|string|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|name|index|unique: true|

### Association
- belongs_to :group
- belongs_to :user



