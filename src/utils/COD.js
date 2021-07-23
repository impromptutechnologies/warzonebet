var request = require('request');
const { API } = require('@callofduty/api')

// Step 2: Login with email + password (top-level await as shown below may not be available in your environment, wrap as necessary)
/*const { xsrf, sso, atkn } = CallOfDutyAPI.Authorize('jongbin1010@gmail.com', 'Jongbin1', (req, res, err) => {
    if(err){
        console.log(err)
    }else{
        // Step 3: Update API instance and continue as an authenticated user
        CallOfDutyAPI.UseTokens({ xsrf, sso, atkn })
        // Step 4: Fetch the identity for this account to find username/platform for desired game
        const { titleIdentities } = CallOfDutyAPI.Identity((req, res, error)=>{
            if(error){
                console.log(error)
            }
            const { username, platform } = titleIdentities.find(identity => identity.title === 'mw')
        })
    }
})*/
const codpi = async () => {
    const CallOfDutyAPI = new API()
    try{
        const xsrf = 'PoqIOFB0Y_88i-Wd43BB-Ck2m-XY0j383HHuTNqI6mLLPPy90zcAwE8PLl2IG6c8'
        const sso = 'MTU3MTAyODI1OTQwNjc3NjI4MTU6MTYyODE2NzkxMzQwNjpjNzZhNTNjNWJjNGYzNGY4YTBkYmE2OWJmNTUzMzk4MA'
        const atkn = 'eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.b-1PIla58S3hIixRYW1G7Mqwr1qZaG_NXJCfoQXX5l6W45o-ijwIJg.oi8LEDhzF1bgcRWV.sxSI7GvAc_6ksbDd3d0nGDvmYcauFr8JBKSlhYMbK0F72KqRmFFPlG6HztALL64rXEYoZb5jPBUp50Hy5LaxHgJl_IL_OgXoh8J03NKH93aBG-frqBxkH6HobJvDXR8apfUiE1Sj2OIGDj6TLCLRcZLvSTLglvH2m0wmT8pEBPxklTpFGDjCrcyLbJpShnmrLG3ExgHsBZ2QoEkYSu2sdXBZiW-ptendDYBLx2hkeitvcHsgxTx2x2IH_CdyVDQ45p5kdyLWBiU0m3VvjGoVLQHE0c6QRsV0j-BhRIuPyRPdrlgRwHMW0XN_SqpQkrJKTrwaPW2GcJdiUPP1YPWC-aNHuB09kwILCdgmbX0TsQKpLB_0O8uBUa39VtjT7cfi2k0NOnhBg2jCRAwC0fueUkDJ96pj8xSSPQ0Bs2slBgEyGx3R6ZFZ0kVaz6_xXkzj138uwO98vCop5fh1QB2w3suoR5Y.fQvtxaqNmGpCzbAPeqaZQA'
        CallOfDutyAPI.UseTokens({ xsrf, sso, atkn })
        const { titleIdentities } = await CallOfDutyAPI.Identity()
        console.log(titleIdentities)
        const { username, platform } = titleIdentities.find(identity => identity.title === 'mw')
    }catch(err){
        console.log(err)
    }
}
codpi()
// Step 5: Filter for game-specific profiles (we'll use MW and assume there is only one profile but multiple are supported)





/*var options = {
  'method': 'GET',
  'url': 'https://s.activision.com/activision/login',
  'headers': {
      'username':'Jongbin1010@gmail.com',
      'password':'Jongbin1'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body._csrf);
});
var options = {
  'method': 'POST',
  'url': 'https://s.activision.com/do_login?new_SiteId=activision',
  'headers': {
    'Cookie': 'XSRF-TOKEN=iJWQyzww1qW_-S0SGNC1wK2h4fXg-RQvYPCWT3nr78o0NoGuGp09-Tm8RG3nOl7L; new_SiteId=activision;'
  },
  form: {
    'username': 'Your login email for callofduty.com',
    'password': 'Your login password for callofduty.com',
    'remember_me': 'true',
    '_csrf': 'iJWQyzww1qW_-S0SGNC1wK2h4fXg-RQvYPCWT3nr78o0NoGuGp09-Tm8RG3nOl7L'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});*/