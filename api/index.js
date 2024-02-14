const express = require('express');
const request = require('request');
const axios = require('axios');
const app = express();
const port = 8080;

app.get('/api', async (req, res) =>{
    var search = req.query.search;
    if (!search) return res.json({ error: 'pinterest API' });
	var headers = {
		  'authority': 'www.pinterest.com',
		  'cache-control': 'max-age=0',
		  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
		  'upgrade-insecure-requests': '1',
		  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
		  'sec-gpc': '1',
		  'sec-fetch-site': 'same-origin',
		  'sec-fetch-mode': 'same-origin',
		  'sec-fetch-dest': 'empty',
		  'accept-language': 'en-US,en;q=0.9',
		  'cookie': 'csrftoken=60044aaedfd5fbca5c76d9abb9d5c1fe; g_state={"i_l":0}; _auth=1; _pinterest_sess=TWc9PSZGYmtacVU2M3V1L3pWdXl6ZkZGVTdob0N2Z2ZTNVBWbytudFVIaWtnS2xLbjRSN2NQTjNmK1BndzJWejlkSTNIalk1em1NdUQ0QTJZY0xZMDVvcGNwR2pQNmNSZ0UwSjkrWVlOZERrcFdGeXVHYVdSUWVTSmZ0bUpuWWc2OTJmMXdhbzhDc0tGRXBoQTllUiswSmV1d1dkOFBZdjQxOHhUcVBJdlcxemZYQ0tCNmNCdU9FcS94Y2Y0b0hIY3hJNXY4UzMxQ0VneUdoSHRZUGRQZ0VKcUpDTHhsTlFGU29ZRldOTk14bm9JQnZFWWRaVzQvKzN3ZzJ5N3JPckpvaDBJaE1FQU43TUNScE9GTVpjNnJacXJiRmdCN0pscUdyaVgvMGVNNkhCNUtScEYreEU5aHVKQ1ZLL2t5a3QwNStyenc2V2pWU1crVnJnNEZOWGVXZ2VVM2tEYTNTeEF1YVl5VjkwanBOTFRWTU1sQmhCNHlIQmpWVHdrcFJ4Z1hmaExKNmZqdnkycmx1UnZOWjF3Rm91UUtOSExyVVRvV3F6LzhMakQrbEdLT0pWd0ZyM0xYS0FUM1lZNWY5Qzd5eDM3K2RVem85aGlhZWgreG9OTGpReFJUemFzN01wbEgzNTBRTDJrdU1PcmZqaGZhSGFaeGZzTDRpTzRsUzFVMG01N3hyNXFLYks5dUFzUDZCUmJ1Q2VzK0tXZXoyT3FnR01UWFNrai9aUTZBN1FoUFo1aUFuSThsbHovSlhGZFl2MDlnWWRCSm15Vjgwem16bURmbFZKQWxpMFdnR3J4MTQvdmZsV1QvaWU1aS95bXo2eG4rN0dqcy9mZFNSNnU5bnZWMnltZTY0bUM5b2lpUTJRNnM5d0x4bjJ6UnV6M0o3clF0NVhUbFpVN1FNUTJFODZpSGh1aThnVUU5REtMbVY4ZVFGTFA0N2hodFNubkcvckJDUGt1WDFkY0lUWW9NbVBmVW5UbW1LN2l3MGZ3VnAwSEdNNHlGNjU2TVU5SXRVWm5PUFRyTk1LSEtXZ3NMcGl2a2FnQUxDekRDOWp2S1VNOVczWWNvOUFFUFpyTHZVdXVUSi92MzNCTWdXOWthWHVLdXZ4WkpMZEVPRFRWdk1NQ3lyd05KdlM4UGZMRHliUk1kT1JiMXlHZVNXNlVjOXBNTXBMUnRFN3NzRS8zVUJvMTRkNWRSQ1RsVTNGL1l2MU9ITTVXOXJvMGx5dVZLMTdKcG9Zcm1WeGdMTDg1b0dnQmcxS1BBMU9SMys2eGdqUlVSMlJqRXRBdTl3Q0JLRC9PM21zNDh5TXJ4cmN3Tk5GOEgreTZHQ0lwbUp4TXhleE9rVjBrVmZITmdqT0h2NE0zV0xIOFBNS1lOaHpYdzBKQkwvaUZreFhOM24yV2N4SmZUUmNydmN0VjVYSG90dExOQmNHU2Rka2U1TEU0ZVVNVHJQMXlmZzE4d3dMYWtYcmpCMFplZ1QveU1HQmFtNG9MUU5KYmNXd0t1c0MrRzl6Q2tGZU40TitlOGRzRUI0RVl3TlNYV2JYWWlTSGJ3Q1FjL3ZwRU1zSGNxdEpLL0FjZm8yMlJVcStNQVhjcHd0NCtNaERhRWYzTzRPVDNLbGQ0Yk95K3JaZnAwRFIwcFVxWjJGbU1COFd2ZmplQWF6OWpIc1NTSkRvTEJSS0QzYjRHbWowcDY1amk2ajlHcGgvQ3JrOWVJYlFJZ1dzbHA4T3UxdDQwTnNiWldyam5GTUE0ZFdwNmtidUY0dnk1RTlNVlF5NVU2NHBzTHZLZ1BaSDAmZFFPZUlaNHF0U3RPcVNWT01NaVFMRUZHUDVjPQ==; _b="AXkASBmzj7FPO5jZ04kI3Er6Dt88p/q8cNtxF/INi7S94SYwyAQJHPXSNOO/+Ixba9M="; _routing_id="8cc8037d-5ee2-44d3-b441-e7a1fca9cb07"; sessionFunnelEventLogged=1'
	 };
	var options = {
		  url: 'https://www.pinterest.com/search/pins/?q=' + search + '&rs=typed&term_meta[]=' + search + '%7Ctyped',
		  headers: headers
	 };

    
    try{
        const response = await axios.get(options.url, { headers: headers });
        const arrMatch = response.data.match(/https:\/\/i\.pinimg\.com\/originals\/[^.]+\.jpg/g);
        const mydata = {
            count: arrMatch.length,
            data: arrMatch
        }
        return res.type('json').send(JSON.stringify(mydata, null, 2) + '\n');
    } catch(error){
        console.error(error);
        res.json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
