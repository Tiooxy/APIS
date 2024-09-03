const axios = require('axios'), crypto = require('crypto'), cheerio = require('cheerio'), fetch = require('node-fetch'), qs = require("qs"), FormData = require('form-data')

const userId = crypto.randomUUID();


async function igdl(url) {
    try {
        const indown = axios.create({
            baseURL: 'https://indown.io/',
            withCredentials: true,
        });

        const {
            data: html,
            headers
        } = await indown.get('/');
        const $ = cheerio.load(html);
        const token = $('input[name="_token"]').val();
        const cookies = headers['set-cookie'].join('; ');

        const {
            data: ip
        } = await axios.get('https://api.ipify.org');

        const formData = new FormData();
        formData.append('referer', 'https://indown.io/insta-stories-download');
        formData.append('locale', 'en');
        formData.append('p', ip);
        formData.append('_token', token);
        formData.append('link', url);

        const response = await indown.post('/download', formData, {
            headers: {
                'XSRF-TOKEN': token,
                ...formData.getHeaders(),
                'Cookie': cookies,
            },
        });

        const $result = cheerio.load(response.data);
        const videoLink = $result('.btn-group-vertical a').first().attr('href');

        if (videoLink) {
            const hasil = new URL(videoLink).searchParams.get('url');
            return [hasil];
        } else {
            const imageUrls = [];
            $result('.image-link img').each((index, element) => {
                const imgSrc = $(element).attr('src');
                if (imgSrc) {
                    imageUrls.push(imgSrc);
                }
            });
            return imageUrls;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function blackb(teks) {
try {
let id = userId
let json = {
    "messages": [{
        "id": id,
        "content": teks,
        "role": "user"
    }],
    "id": id,
    "previewToken": null,
    "userId": userId,
    "codeModelMode": true,
    "agentMode": {
      "mode": true,
      "id": "tioYvlHC5x"
      },
    "trendingAgentMode": {},
    "isMicMode": false,
    "isChromeExt": false,
    "githubToken": null
}

let { data } = await axios.post('https://www.blackbox.ai/api/chat', json)
let result = data.replace(/\$\@\$\w+=\S+\$/g, '');
return result
} catch (e) {
return e
}
}

async function tiktok(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`
    let response = await (await fetch(tikwm)).json()
    return response.data
}

async function logo(prompt) {
    try {
        const {
            data
        } = await axios.post('https://boredhumans.com/apis/boredagi_api.php',
            `prompt=${prompt.replace(/\s+/g, "%2520")}&uid=lwle4nyomx5t0w6quo8&sesh_id=6a55e5df-19f2-4043-b295-a8955f9d528c&get_tool=false&tool_num=44`, {
                headers: {
                    'User-Agent': 'Googlebot-News',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        const url = data.output.match(/src="([^"]+)"/)[1]
        return url
    } catch (e) {
        return e
    }
}

async function dytopia(query) {
    try {
        const response = await axios.post('https://boredhumans.com/apis/boredagi_api.php',
            `prompt=${query}&uid=lwle4nyomx5t0w6quo8&sesh_id=multistep-82cb1e26-d257-4dd0-b34b-1d35af1c712d&get_tool=false&tool_num=23`, {
                headers: {
                    'User-Agent': 'Googlebot-News',
                }
            });
        return response.data
    } catch (e) {
        return e
    }
}

async function tts(prompt) {
    try {
        const { data } = await axios.post("https://tiktok-tts.weilnet.workers.dev/api/generation", {
            "text": prompt,
            "voice": 'id_001'
        })
        
        return data.data
    } catch (e) {
        return e
    }
}
async function deepenglish(prompt, text) {
          const url = 'https://deepenglish.com/wp-json/ai-chatbot/v1/chat';
        let { data: res }  = await axios.get("https://deepenglish.com/aichatbot/")
            let $  = cheerio.load(res);    
            let a = $('script').text();
            const regex = /let restNonce = '(.*)';/;
            let nonce = a.match(regex)[1]

          const headers = {
            'Content-Type': 'application/json',
            'X-WP-Nonce': nonce
          };
          const data = {
            "env": "chatbot",
            "session": "N/A",
            "prompt": "Jawab pertanyaan ini:\\n\\n\\n\\nPertanyaan:",
            "context": "Jawab pertanyaan ini:\\n\\n\\n\\nPertanyaan:",
             "messages": [
              {"role": "system", "content": `${prompt}`},
              {"role": "assistant", "content": `${prompt}`},
              {"role": "user", "content": text}
            ],
            "rawInput": text,
            "userName": "User",
            "aiName": "Ai",
            "model": "gpt-3.5-turbo",
            "temperature": 0,
            "maxTokens": 1024,
            "maxResults": 1,
            "apiKey": "",
            "embeddingsIndex": "",
            "stop": ""
          };
          try {
            const response = await axios.post(url, data, {headers: headers})
            const result = await response.data;
              
            return result.answer
          } catch (error) {
            console.error(error);
            return { msg: error }
          }
}

async function threads(url) {

    const regex = /post\/([^/?]+)/;
    const match = url.match(regex);
    const id = match ? match[1] : null;

    if (id) {
        let headers = {
            accept: "*/*"
        };

        let {
            data
        } = await axios.get(`https://threadster.app/download/${id}`, {
            headers
        });
        let $ = cheerio.load(data);
        const result = [];

        // jikok ling gambar 
        $('.download__items .image img').each((index, element) => {
            const imgUrl = $(element).attr('src');
            if (imgUrl) {
                result.push(imgUrl);
            } else {
                false
            }
        });

        // jikok ling video bokep
        $('.download__wrapper .download__items .download_item.active .video_wrapper .video video').each((index, element) => {
            const videoUrl = $(element).attr('src');
            if (videoUrl) {
                result.push(videoUrl);
            } else {
                false
            }
        });

        return {
            result
        }

    } else {
        return {
            msg: "koe pekok su ra enek id ne"
        }
    }

}

async function twitter(link) {
	
		let config = {
			'url': link
		}
    try {
		let { data } = await axios.post('https://www.expertsphp.com/instagram-reels-downloader.php',qs.stringify(config),{
			headers: {
				"content-type": 'application/x-www-form-urlencoded',
				'cookie':'_gid=GA1.2.1209552833.1682995186; _gat_gtag_UA_120752274_1=1; __gads=ID=e2d27851a97b70ac-222d68fe87e000b0:T=1682995185:RT=1682995185:S=ALNI_MYaXoBa8KWleDZ97JpSaXGyI7nu3g; __gpi=UID=00000be71a67625d:T=1682995185:RT=1682995185:S=ALNI_MYyedH9xuRqL2hx4rg7YyeBDzK36w; _ga_D1XX1R246W=GS1.1.1682995185.1.1.1682995205.0.0.0; _ga=GA1.1.363250370.1682995185',
				'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
			  },
		})
		
		const $ = cheerio.load(data)
        let video = $('div.col-md-4.col-md-offset-4 > table > tbody > tr > td > video').attr('src')
        return video
    } catch (e) {
        return {msg: e}
    }

}

module.exports = { blackb, tiktok, logo, dytopia, tts, igdl, deepenglish, threads, twitter }