import axios from "axios";
import * as cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice } from "../utils";
export async function scrapeAmazonProduct(url: string) {
    if (!url) return;

    //use brightdata proxy configuration
    //curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_0da72b64-zone-unblocker:opqd772pnlre -k https://lumtest.com/myip.json
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false
    }

    try {
        const res = await axios.get(url, options)
        // console.log(res.data)
        const $ = cheerio.load(res.data)
        //Extract the product title
        const title = $('#productTitle').text().trim()
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
        )

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')

        )
        const images = 
        $('#imgBlkFront').attr('data-a-dynamic-image') || 
        $('#landingImage').attr('data-a-dynamic-image') ||
        '{}'

        const imageUrls= Object.keys(JSON.parse(images))

        const globalrating = $('.averageStarRatingNumerical span.a-size-base.a-color-secondary').text()
        const stars= $('.a-star-4-5.cm-cr-review-stars-spacing-big span.a-icon-alt').text().slice(0,3);
        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
        const description = extractDescription($)
        
        

        // console.log({ title, currentPrice, originalPrice, outOfStock,imageUrls ,description,discountRate ,currency})


        const data = {
            url,
            currency:currency|| '$',
            image:imageUrls[0],
            title:title,
            currentPrice:Number(currentPrice) || Number(originalPrice),
            originalPrice:Number(originalPrice) || Number(currentPrice),
            priceHistory:[],
            discountRate:Number(discountRate),
            category:'category',
            reviewsCount:100,
            isOutOfStock:outOfStock,
            description:description,
            stars:stars,
            globalrating:globalrating,
            lowestPrice:Number(currentPrice) || Number(originalPrice),
            highestPrice:Number(originalPrice) || Number(currentPrice),
            averagePrice:Number(currentPrice) || Number(originalPrice)

        }

        console.log(data)

        return data
    } catch (error: any) {
        throw new Error(`Faailed to scrape product:${error.message}`)
    }
}