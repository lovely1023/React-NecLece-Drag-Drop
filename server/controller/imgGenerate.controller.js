const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

const { v4 : uuidv4 } = require('uuid');

const baseUrl = "../src/assets"

const imgPos = {
    x: 0,
    y: 0,
    wid: 500,
    hei: 500,
}

const downloadNecklace = async (req, res) => {
    let {
        necklace,
        bigJewel,
        bigJewelPos,
        smallJewel,
        smallJewelPos
    } = req.query;
    let necklaceUrl = necklace.trim().slice(28)
    let bigjewelUrl = bigJewel.trim().slice(28)
    let bigjewelUrlsPos = bigJewelPos.split(',')
    let smallJewelUrls = smallJewel.trim().split(',').map(single => single.slice(28))
    let smallJewelUrlsPos = smallJewelPos.trim().split('|').map(obj => JSON.parse(obj))
    try {
        const canvas = createCanvas(imgPos.wid, imgPos.hei + 100)
        const context = canvas.getContext('2d')
        context.fillStyle = "gray";
        context.fillRect(0, 0, canvas.width, canvas.height);
        let imgNecklace = await loadImage(`${baseUrl}${necklaceUrl}`);
        context.drawImage(imgNecklace, 0, 0, imgPos.wid, imgPos.hei);
        
        let imgBigjewel = await loadImage(`${baseUrl}${bigjewelUrl}`);
        context.drawImage(imgBigjewel, bigjewelUrlsPos[0] * (imgPos.wid) / 100 - 40, bigjewelUrlsPos[1] * (imgPos.wid) / 100, 80, 80)
        
        console.log(smallJewelUrlsPos)
        console.log(smallJewelUrls)
        for (let i = 0; i < smallJewelUrls.length; i ++) {
            if (smallJewelUrls[i] !== "") {
                let imgSmalljewel = await loadImage(`${baseUrl}${smallJewelUrls[i]}`);
                context.translate((smallJewelUrlsPos[i].x) * (imgPos.wid) / 100 + parseInt(smallJewelUrlsPos[i].ml) + 20, (smallJewelUrlsPos[i].y) * (imgPos.hei) / 100) + 40;
                // context.rotate(parseInt(smallJewelUrlsPos[i].rotate)*Math.PI/180);
                
                context.fillStyle = "blue";
                context.fillRect(-50, -0, 100, 100);
                context.drawImage(
                    imgSmalljewel, 
                    // parseInt(smallJewelUrlsPos[i].ml), 
                    -40, 
                    0, 
                    80, 
                    80)
                // context.rotate(parseInt(smallJewelUrlsPos[i].rotate)*Math.PI/(-180));
                context.translate((smallJewelUrlsPos[i].x) * (imgPos.wid) / (-100) - parseInt(smallJewelUrlsPos[i].ml) - 20, (smallJewelUrlsPos[i].y) * (imgPos.hei) / (-100)) - 40;
            }
        }
        // let imgHome = await loadImage(`${baseUrl}`);
        // context.drawImage(imgHome, imgPos.x, imgPos.y, imgPos.wid, imgPos.hei)

        const buffer = canvas.toBuffer('image/png')
        const name = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        await fs.writeFileSync(`${__dirname}/temp/${name}.png`, buffer);
        res.status(200).sendFile(`${__dirname}/temp/${name}.png`);
        // res.status(200).json({});
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
    // res.status(200).json(req.query)
}

module.exports = {
    downloadNecklace
}