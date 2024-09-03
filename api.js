const express = require('express');
const axios = require("axios");
const randomUseragent = require('random-useragent');
const fetch = require('node-fetch');
const yts = require("yt-search");
//const canvafy = require("canvafy")
const { yt } = require('./ytdl.js');
const { blackb, tiktok, igdl, threads, deepenglish, twitter, dytopia, tts } = require('./scrape');
const { Prodia } = require('prodia.js');

const apiKey = "f5c9ab8e-2041-4d3f-be94-7a516c08d34e";
const prodia = Prodia(apiKey);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
/*info*/
const creator = 'Tio';


app.get('/', (req, res) => {
  const getRoutes = [];
  app._router.stack.forEach(layer => {
    if (layer.route && layer.route.methods.get && layer.route.path !== '/' && layer.route.path !== '/post') {
      const route = layer.route;
      const method = Object.keys(route.methods)[0].toUpperCase();
      getRoutes.push({ path: route.path, method });
    }
  });

  // Sort routes by path name
  getRoutes.sort((a, b) => {
    const nameA = a.path.split("/")[2] || "";
    const nameB = b.path.split("/")[2] || "";
    return nameA.localeCompare(nameB);
  });

  // Generate HTML response
  let html = `
  <style>
    body, html {
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
    }

    #background-video {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
      filter: brightness(50%);
    }

    .content {
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);
      border-radius: 30px;
      padding: 20px;
      max-width: 1000px; /* memperbesar max-width */
      width: 90%; /* memperbesar lebar */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    th, td {
      padding: 8px;
      color: white;
      text-align: center;
      border: 1px solid black;
      width: 200px; /* memperbesar lebar kolom */
    }

    h1 {
    color: yellow;
      text-align: center;
    }

    button {
      background-color: green;
      border-radius: 10px;
      color: white;
      border: 2px solid black;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }

    select {
      padding: 10px;
      font-size: 16px;
      margin-bottom: 20px;
      width: 200px;
    }

    footer {
      background-color: #D3D3D3;
      font-family: serif;
      text-align: center;
      padding: 8px;
      position: fixed;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>

  <video id="background-video" autoplay loop muted>
    <source src="https://telegra.ph/file/8589d74d5395a8b1636b7.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>

  <div class="content">
    <h1>GET API Endpoints</h1>
    <select id="routeSelect" onchange="navigateToRoute()">
      <option value="">Pilih Route</option>
      <option value="/">GET</option>
      <option value="/post">POST</option>
    </select>
    <table>
      <tr><th>Nama</th><th>Method</th><th>Aksi</th></tr>`;

  getRoutes.forEach(route => {
    html += `
      <tr>
        <td>${route.path.split("/")[2]}</td>
        <td>${route.method}</td>
        <td>
          <form action="${route.path}" method="get" target="_blank">
            <button type="submit">Execution</button>
          </form>
        </td>
      </tr>`;
  });

  html += `</table>
  </div>

  <script>
    function navigateToRoute() {
      const select = document.getElementById('routeSelect');
      const route = select.value;
      if (route) {
        window.location.href = route;
      }
    }
  </script>
  <footer><a href='https://whatsapp.com/channel/0029VaAL6O98PgsBKJzMrs04' target="blank">© Tio 2021-2024</a></footer>`;
  res.send(html);
});


app.get('/post', (req, res) => {
  const postRoutes = [];
  app._router.stack.forEach(layer => {
    if (layer.route && layer.route.methods.post) {
      const route = layer.route;
      const method = Object.keys(route.methods)[0].toUpperCase();
      postRoutes.push({ path: route.path, method });
    }
  });

  // Sort routes by path name
  postRoutes.sort((a, b) => {
    const nameA = a.path.split("/")[2] || "";
    const nameB = b.path.split("/")[2] || "";
    return nameA.localeCompare(nameB);
  });

  // Generate HTML response
  let html = `
  <style>
    body, html {
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
    }

    #background-video {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
      filter: brightness(50%);
    }

    .content {
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);
      border-radius: 30px;
      padding: 20px;
      max-width: 1000px;
      width: 90%;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    th, td {
      padding: 8px;
      color: white;
      text-align: center;
      border: 1px solid black;
      width: 200px;
    }

    h1 {
      text-align: center;
    }

    button {
      background-color: green;
      border-radius: 10px;
      color: white;
      border: 2px solid black;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }

    select {
      padding: 10px;
      font-size: 16px;
      margin-bottom: 20px;
      width: 200px;
    }

    footer {
      background-color: #D3D3D3;
      font-family: serif;
      text-align: center;
      padding: 8px;
      position: fixed;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>

  <video id="background-video" autoplay loop muted>
    <source src="https://telegra.ph/file/8589d74d5395a8b1636b7.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>

  <div class="content">
    <h1>POST API Endpoints</h1>
    <select id="routeSelect" onchange="navigateToRoute()">
      <option value="">Pilih Route</option>
      <option value="/">GET</option>
      <option value="/post">POST</option>
    </select>
    <table>
      <tr><th>Nama</th><th>Method</th><th>Aksi</th></tr>`;

  postRoutes.forEach(route => {
    html += `
      <tr>
        <td>${route.path.split("/")[2]}</td>
        <td>${route.method}</td>
        <td>
          <form action="${route.path}" method="post" target="_blank">
            <button type="submit">Execution</button>
          </form>
        </td>
      </tr>`;
  });

  html += `</table>
  </div>

  <script>
    function navigateToRoute() {
      const select = document.getElementById('routeSelect');
      const route = select.value;
      if (route) {
        window.location.href = route;
      }
    }
  </script>
  <footer><a href='https://whatsapp.com/channel/0029VaAL6O98PgsBKJzMrs04' target="blank">© Tio 2021-2024</a></footer>`;
  res.send(html);
});

/**
 * searching
 * 
 */
app.get('/api/pinterest', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.json({ status: false, message: 'masukan parameter query' });
      async function pin(text) {
        let {
            data
        } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
        let res = data.resource_response.data.rankedGuides.map(v => v.image_medium_url.replace("60x60", "736x"));
        return res
      }
        const result = await pin(query);
        res.json({ creator, result });
    } catch (e) {
        res.json({ status: false, message: e.message });
    }
});
app.get('/api/yts', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.json({ status: false, message: 'masukan parameter query' });
        const { all } = await yts(query);
        res.json({ creator, result: all });
    } catch (e) {
        res.json({ status: false, message: e.message });
    }
});

/**downloader**/

app.get('/api/twitter', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.json({ status: false, message: 'masukan parameter url' });
        let result = await twitter(url);
        res.json({ creator, data: result });
    } catch (e) {
        res.json({ status: false, message: e.message });
    }
});

app.get('/api/threads', async (req, res) => {
    try {
    let { url } = req.query;
    if (!url) return res.json({ status: false, message: 'masukan parameter url'})
    let result = await threads(url);
    res.json({ creator, data: result })
    } catch (e) {
        res.json({ status: false, message: e.message })
    }
})

app.get('/api/ytdl', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.json({ status: false, message: 'masukan parameter url' });
        const result = await yt(url);
        res.json({ creator, result });
    } catch (e) {
        res.json({ status: false, message: e });
    }
});

app.get('/api/igdl', async (req, res) => {
    try {
    let { url } = req.query;
    if (!url) return res.json({ status: false, message: 'masukan parameter url'})
    let result = await igdl(url);
    res.json({ creator, data: result })
    } catch (e) {
        res.json({ status: false, message: e.message })
    }
})

app.get('/api/tiktok', async (req, res) => {
    try {
    let { url } = req.query;
    if (!url) return res.json({ status: false, message: 'masukan parameter url'})
    let result = await tiktok(url);
    res.json({ creator, data: result })
    } catch (e) {
        res.json({ status: false, message: e.message })
    }
})
/**tools**/
app.get('/api/tts', async (req, res) => {
    try {
    let text = req.query.text;
    if (!text) return res.json({msg: 'masukan text'})
    let result = await tts(text);
    res.json({ creator, type: 'arraybuffer', data: result })
} catch (e) {
        res.status(400).json({msg: e})
}    
})

/**grup**/
/*app.get('/leave', async (req, res) => {
    try {
        const pp = req.query.pp || 'default_avatar_url'; // Ganti 'default_avatar_url' dengan URL yang valid jika diperlukan.
        const name = req.query.name || 'Guest'; // Nama default jika tidak ada.
        const description = req.query.desc || 'Selamat jalan kawan!'; // Deskripsi default jika tidak ada.
        
        const leaveCanvas = await new canvafy.WelcomeLeave()
            .setAvatar(pp)
            .setBackground("image", "https://telegra.ph/file/39ef0462ab2a3cc5ebfcc.jpg")
            .setTitle(`Goodbye, ${name}`)
            .setDescription(description)
            .setBorder("#2a2e35")
            .setAvatarBorder("#2a2e35")
            .setOverlayOpacity(0.3)
            .build();
        
        res.setHeader('Content-Type', 'image/png');
        res.send(leaveCanvas);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while generating the image.');
    }
});

//app.get('/welcome', async (req, res) => {
    try {
        const pp = req.query.pp || 'default_avatar_url'; // Ganti 'default_avatar_url' dengan URL yang valid jika diperlukan.
        const name = req.query.name || 'Guest'; // Nama default jika tidak ada.
        const description = req.query.desc || `Selamat datang di Grup ${groupName}`; // Deskripsi default jika tidak ada.
        
        const welcomeCanvas = await new canvafy.WelcomeLeave()
            .setAvatar(pp)
            .setBackground("image", "https://telegra.ph/file/39ef0462ab2a3cc5ebfcc.jpg")
            .setTitle(`Welcome, ${name}`)
            .setDescription(description)
            .setBorder("#2a2e35")
            .setAvatarBorder("#2a2e35")
            .setOverlayOpacity(0.3)
            .build();
        
        res.setHeader('Content-Type', 'image/png');
        res.send(welcomeCanvas);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while generating the image.');
    }
}); */
/**ai**/

app.get('/api/simsimi', async (req, res) => {
    try {
    let text = req.query.text;
    if (!text) return res.json({msg: 'masukan text'})
    const data = new URLSearchParams();
    data.append('text', text);
    data.append('lc', 'id');
    data.append('=', '');

    const config = {
      method: 'post',
      url: 'https://simsimi.vn/web/simtalk',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest'
      },
      data: data
    };

    let { data: result } = await axios(config)
    res.json({ creator, data: result })
} catch (e) {
        res.status(400).json({msg: e})
}    
})

app.get('/api/blackbox', async (req, res) => {
    try {
    let text = req.query.text;
    if (!text) return res.json({msg: 'masukan text'})
    let result = await blackb(text);
    res.json(result)
} catch (e) {
        res.status(400).json({msg: e})
}    
})

app.get('/api/dytopia', async (req, res) => {
    try {
    let text = req.query.text;
    if (!text) return res.json({msg: 'masukan text'})
    let teks = decodeURIComponent(text)
    let result = await dytopia(teks);
    res.json(result)
} catch (e) {
        res.status(400).json({msg: e})
}    
})

app.get('/api/deepenglish', async (req, res) => {
    try {
        const { prompt, text } = req.query;
        if (!prompt || !text) return res.json({msg: 'masukan parameter prompt dan text'});
        let result = await deepenglish(prompt, text);
        res.json({ creator, data: result })
    } catch (e) {
        res.status(400).json({msg: e})
    }
})

app.get('/api/prompt', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.json({ status: false, message: 'masukan parameter text' })
    try {
    const prom = async (concept) => {
  try {
    const apiUrl = `https://aiart.manigopalmurthy.workers.dev/prompts?count=10&concept=${concept}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
    return null;
  }
};
let hasil = await prom(text);
const result = JSON.parse(hasil.candidates[0].content.parts[0].text);
res.json({ creator, data: result })
    } catch (e) {
        res.json({ status: false, message: e.message })
    }
})

app.get('/api/hdr', async (req, res) => {
    const media = req.query.url; // ambil data image dari request body
    const scale = req.query.scale || 2; // ambil skala resize dari request body
    if (scale > 8) return res.json({ status: false, message: 'Skala tidak boleh lebih dari 8' })
    
    if (!media) {
        return res.status(400).send('Media tidak ditemukan');
    }
    const { data: img } = await axios.get(media, {responseType: 'arraybuffer'})
    let result = Buffer.from(img).toString('base64')
    try {
        const params = {
            imageData: result,
            resize: scale
        };

        const generate = await prodia.upscale(params);

        while (generate.status !== "succeeded" && generate.status !== "failed") {
            await new Promise((resolve) => setTimeout(resolve, 250));

            const job = await prodia.getJob(generate.job);

            if (job.status === "succeeded") {
                return res.status(200).json({ creator, data: job });
            }
        }

        return res.status(500).send('Gagal mengubah skala gambar');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Terjadi kesalahan saat mengubah skala gambar');
    }
})

const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
