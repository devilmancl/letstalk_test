'use strict';

const MAX_USERS_INFO = 10;

module.exports = function(UserInfo) {
	UserInfo.disableRemoteMethodByName('create');
	UserInfo.disableRemoteMethodByName('upsert');
	UserInfo.disableRemoteMethodByName('updateAll');
	UserInfo.disableRemoteMethodByName('prototype.updateAttributes');

	UserInfo.disableRemoteMethodByName('find');
	UserInfo.disableRemoteMethodByName('findById');
	UserInfo.disableRemoteMethodByName('findOne');

	UserInfo.disableRemoteMethodByName('deleteById');

	UserInfo.disableRemoteMethodByName('confirm');
	UserInfo.disableRemoteMethodByName('count');
	UserInfo.disableRemoteMethodByName('exists');
	UserInfo.disableRemoteMethodByName('resetPassword');

	UserInfo.disableRemoteMethodByName('prototype.__count__accessTokens');
	UserInfo.disableRemoteMethodByName('prototype.__create__accessTokens');
	UserInfo.disableRemoteMethodByName('prototype.__delete__accessTokens');
	UserInfo.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
	UserInfo.disableRemoteMethodByName('prototype.__findById__accessTokens');
	UserInfo.disableRemoteMethodByName('prototype.__get__accessTokens');
	UserInfo.disableRemoteMethodByName('prototype.__updateById__accessTokens');

	UserInfo.disableRemoteMethodByName('createChangeStream');

	UserInfo.disableRemoteMethodByName('prototype.__get__tags');
	UserInfo.disableRemoteMethodByName('prototype.__create__tags');

	UserInfo.search = function(text_searched, cb) {
		if(!text_searched)
			return cb(null, []);

		var texts_to_search = text_searched.trim().split(' ');

		if(texts_to_search.length > 0) {
			var fields = ["name", "line1", "line2", "city", "state", "zip", "phone"];

			var ands = [];
			for(var ts in texts_to_search) {
				var text_to_search = texts_to_search[ts];
				var ors = [];
				for(var f in fields) {
					var field_like = {};
					field_like[fields[f]] = {like: "%"+text_to_search+"%"};
					ors.push(field_like);
				}
				ands.push({or: ors});
			}

			UserInfo.find({where: {and: ands}, limit: MAX_USERS_INFO, order: "name ASC"}, function(err, users_info) {
				if(err) {
					console.log(err)
					return cb(null, []);	
				}
				return cb(null, users_info);
			});
		} else {
			return cb(null, []);
		}
    }

    UserInfo.remoteMethod('search', {
		accepts: {arg: 'text_searched', type: 'string'},
		returns: {type: 'array', root: true}
    });
};
