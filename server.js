const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const accountsCount = require('./routes/accountsCount');
const onlineUsersCount = require('./routes/usersOnline');
const ccRank = require('./routes/rankings/ccRank');
const rankings = require('./routes/rankings/rankingType');
const siegeInfo = require('./routes/siegeInfo');
const guildWar = require('./routes/rankings/guildWar');
const signin = require('./routes/signin');
const register = require('./routes/register');
const recoveryPassword = require('./routes/recoveryPassword');

//Profile
const changePassword = require('./routes/profile/changePassword');
const userProfile = require('./routes/profile/userProfile');
const cashShopInfo = require('./routes/profile/cashShopInfo');
const transactionHistory = require('./routes/profile/coinsTransactionHistory');

const app = express();
app.use(cors()); //acho que precisarei retirar quando subir

app.use('/count-users-online', onlineUsersCount);
app.use('/registered-accounts', accountsCount);
app.use('/recovery-password', recoveryPassword);
app.use('/cc-rank', ccRank);
app.use('/rankings', rankings);
app.use('/siege-info', siegeInfo);
app.use('/guild-war', guildWar);

app.use(bodyParser.json());
app.use('/signin', signin);
app.use('/register', register);

//Profile
app.use('/profile/:id/change-password', changePassword);
app.use('/', userProfile);
app.use('/', cashShopInfo);
//!!!!!!!!!!!VERIFICAR QUAL MOEDA É CHECADA ABAIXO!!!
app.use('/', transactionHistory);

app.listen(4000);
