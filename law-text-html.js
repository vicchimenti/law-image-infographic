/***
 *      @author Victor Chimenti, MSCS
 *      @see Seattle University School of Law
 *      @file law-text-html.js
 *          Law - Image Infographic
 *          ID: 5615
 *
 *      This content type displays from 1 to 5 infographic cards
 *
 *      Document will write once when the page loads
 *
 *      @version 5.3
 */








/***
 *      Import T4 Utilities
 */
importClass(com.terminalfour.media.IMediaManager);
importClass(com.terminalfour.spring.ApplicationContextProvider);
importClass(com.terminalfour.publish.utils.BrokerUtils);
importClass(com.terminalfour.media.utils.ImageInfo);




/***
 *      Extract values from T4 element tags
 *      and confirm valid existing content item field and trim strings
 */
function getContentValues(tag) {

    try {

        let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim()

        return {
            isError: false,
            content: _tag == '' ? null : _tag
        }

    } catch (error) {

        return {
            isError: true,
            message: error.message
        }
    }
}




/***
 *      Returns a media object
 */
function getMediaInfo(mediaID) {

    let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
    let media = mediaManager.get(mediaID, language);

    return media;
}




/***
 *      Returns a media stream object
 */
function readMedia(mediaID) {

    let mediaObj = getMediaInfo(mediaID);
    let oMediaStream = mediaObj.getMedia();

    return oMediaStream;
}




/***
 *      Write the document
 */
function writeDocument(array) {

    for (let i = 0; i < array.length; i++) {

        document.write(array[i]);
    }
}




/***
 *      Main
 */
try {


    /***
     *      Dictionary of content
     * */
    let imageInfoDict = {

        itemName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        infographicTitle: getContentValues('<t4 type="content" name="Infographic Title" output="normal" modifiers="striptags,htmlentities" />'),
        disclaimer: getContentValues('<t4 type="content" name="Disclaimer" output="normal" modifiers="striptags,htmlentities" />'),
        statHeadingOne: getContentValues('<t4 type="content" name="Statistic 1 Heading" output="normal" modifiers="striptags,htmlentities" />'),
        statTextOne: getContentValues('<t4 type="content" name="Statistic 1 Text" output="normal" modifiers="striptags,htmlentities" />'),
        statIconOne: getContentValues('<t4 type="content" name="Statistic 1 Media" output="normal" formatter="path/*" />'),
        statColorOne: getContentValues('<t4 type="content" name="Statistic 1 Color Combination" output="normal" display_field="value" />'),
        statHeadingTwo: getContentValues('<t4 type="content" name="Statistic 2 Heading" output="normal" modifiers="striptags,htmlentities" />'),
        statTextTwo: getContentValues('<t4 type="content" name="Statistic 2 Text" output="normal" modifiers="striptags,htmlentities" />'),
        statIconTwo: getContentValues('<t4 type="content" name="Statistic 2 Media" output="normal" formatter="path/*" />'),
        statColorTwo: getContentValues('<t4 type="content" name="Statistic 2 Color Combination" output="normal" display_field="value" />'),
        statHeadingThree: getContentValues('<t4 type="content" name="Statistic 3 Heading" output="normal" modifiers="striptags,htmlentities" />'),
        statTextThree: getContentValues('<t4 type="content" name="Statistic 3 Text" output="normal" modifiers="striptags,htmlentities" />'),
        statIconThree: getContentValues('<t4 type="content" name="Statistic 3 Media" output="normal" formatter="path/*" />'),
        statColorThree: getContentValues('<t4 type="content" name="Statistic 3 Color Combination" output="normal" display_field="value" />'),
        statHeadingFour: getContentValues('<t4 type="content" name="Statistic 4 Heading" output="normal" modifiers="striptags,htmlentities" />'),
        statTextFour: getContentValues('<t4 type="content" name="Statistic 4 Text" output="normal" modifiers="striptags,htmlentities" />'),
        statIconFour: getContentValues('<t4 type="content" name="Statistic 4 Media" output="normal" formatter="path/*" />'),
        statColorFour: getContentValues('<t4 type="content" name="Statistic 4 Color Combination" output="normal" display_field="value" />'),
        statHeadingFive: getContentValues('<t4 type="content" name="Statistic 5 Heading" output="normal" modifiers="striptags,htmlentities" />'),
        statTextFive: getContentValues('<t4 type="content" name="Statistic 5 Text" output="normal" modifiers="striptags,htmlentities" />'),
        statIconFive: getContentValues('<t4 type="content" name="Statistic 5 Media" output="normal" formatter="path/*" />'),
        statColorFive: getContentValues('<t4 type="content" name="Statistic 5 Color Combination" output="normal" display_field="value" />'),
        summaryText: getContentValues('<t4 type="content" name="Summary Text" output="normal" modifiers="medialibrary,nav_sections" />'),
        zoneOption: getContentValues('<t4 type="content" name="Zone Option" output="normal" display_field="value" />'),
        anchortag: getContentValues('<t4 type="meta" meta="html_anchor" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    }






    /***
     *  Initialize defaults
     * 
     * */
    let beginningHTML = '<div class="infographicWrapper imageInfographic contentItem g-0" id="imagegraphic' + imageInfoDict.contentId.content + '" data-position-default="Main" data-position-selected="' + imageInfoDict.zoneOption.content + '">';
    let anchorString = imageInfoDict.anchortag.content || '<span class="visually-hidden">No Anchor</span>';
    let infographicHeader = '<h2 class="card-header imageInfographicHeader visually-hidden">Image Infographic</h2>';
    let openTitle = '<div class="infographicTitle standardContent visually-hidden">';
    let closeTitle = '</div>';
    let openDisclaimer = '<div class="disclaimerWrapper visually-hidden">';
    let closeDisclaimer = '</div>';
    let disclaimerString = '<p class="infoGraphicDisclaimer card-text visually-hidden">No Disclaimer Entered</p>';
    let cardDeck = '<span class="card visually-hidden"></span>';
    let openGroup = '<div class="infographic card-group flex-column flex-lg-row">';
    let closeGroup = '</div>';
    let summaryString = '<span class="standardContent card-text visually-hidden"></span>';
    let openSummary = '<div class="infographicSummary visually-hidden">';
    let closeSummary = '</div>';
    let endingHTML = '</div>';


    // let imageString = '<span class="imageString hidden visually-hidden" />No Image Provided</span>';
    let openImageWrapper = '<div class="infographicMedia"><figure class="figure d-block standardContent">';
    let closeImageWrapper = '</figure></div>';




    function processImage(rawID, rawImage) {

        let imageID = rawID;
        let mediaInfo = getMediaInfo(imageID);
        let media = readMedia(imageID);
        let info = new ImageInfo;
        info.setInput(media);

        let imageString = (info.check()) ?
            '<img src="' + rawImage + '" class="figure-img card-img" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />' :
            '<img src="' + rawImage + '" class="figure-img card-img" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" loading="auto" />';
        // '<img src="' + rawImage + '" class="figure-img card-img" alt="" loading="auto" />';

        let imageResult = openImageWrapper + imageString + closeImageWrapper;

        return imageResult;
    }




    /***
     *  Parse for title
     * 
     * */
    if (imageInfoDict.infographicTitle.content) {

        beginningHTML = '<div class="infographicWrapper imageInfographic contentItem col border-0 g-0 m-0 p-0" id="imagegraphic' + imageInfoDict.contentId.content + '" data-position-default="Main" data-position-selected="' + imageInfoDict.zoneOption.content + '">';
        openTitle = '<div class="infographicTitle standardContent p-3">';
        infographicHeader = '<h2 class="card-header imageInfographicHeader text-center">' + imageInfoDict.infographicTitle.content + '</h2>';
    }




    /***
     *  Parse for Footer
     * 
     * */
    if (imageInfoDict.summaryText.content) {

        openSummary = '<div class="infographicSummary summaryText standardContent card-text p-3">';
        summaryString = imageInfoDict.summaryText.content;
    }




    /***
     *  Parse for Cards
     *  each card requires a minimum of a number, heading and color combo
     *  Card 1 requires these by default, cards 2 - 4 are enforced logically
     * */
    if (imageInfoDict.statIconOne.content && imageInfoDict.statColorOne.content && imageInfoDict.statHeadingOne.content) {

        // set card defaults
        let openCardWrapperOne = '<div class="cardinfographicItem card border-0 rounded-0 color' + imageInfoDict.statColorOne.content + '">';
        let openCardBodyOne = '<div class="card-body p-0 m-3">';
        let cardHeadingOne = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + imageInfoDict.statHeadingOne.content + '</p></div>';
        let closeCardBodyOne = '</div>';
        let closeCardWrapperOne = '</div>';

        // parse for icon
        let imageOneID = content.get('Statistic 1 Media').getID();
        let cardIconOne = processImage(imageOneID, imageInfoDict.statIconOne.content);

        // parse for text
        let cardTextOne = (imageInfoDict.statTextOne.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center text-uppercase">' + imageInfoDict.statTextOne.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';


        let cardOne = openCardWrapperOne + openCardBodyOne + cardHeadingOne + cardIconOne + cardTextOne + closeCardBodyOne + closeCardWrapperOne;

        cardDeck = cardOne;
    }




    /***
     *  Parse for Card two
     * 
     * */
    if (imageInfoDict.statIconTwo.content && imageInfoDict.statColorTwo.content && imageInfoDict.statHeadingTwo.content) {

        // set card defaults
        let openCardWrapperTwo = '<div class="cardinfographicItem card border-0 rounded-0 color' + imageInfoDict.statColorTwo.content + '">';
        let openCardBodyTwo = '<div class="card-body p-0 m-3">';
        let cardHeadingTwo = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + imageInfoDict.statHeadingTwo.content + '</p></div>';
        let closeCardBodyTwo = '</div>';
        let closeCardWrapperTwo = '</div>';

        // parse for icon
        let imageTwoID = content.get('Statistic 2 Media').getID();
        let cardIconTwo = processImage(imageTwoID, imageInfoDict.statIconTwo.content);

        // parse for text
        let cardTextTwo = (imageInfoDict.statTextTwo.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center text-uppercase">' + imageInfoDict.statTextTwo.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardTwo = openCardWrapperTwo + openCardBodyTwo + cardHeadingTwo + cardIconTwo + cardTextTwo + closeCardBodyTwo + closeCardWrapperTwo;

        cardDeck += cardTwo;
    }




    /***
     *  Parse for Card three
     * 
     * */
    if (imageInfoDict.statIconThree.content && imageInfoDict.statColorThree.content && imageInfoDict.statHeadingThree.content) {

        // set card defaults
        let openCardWrapperThree = '<div class="cardinfographicItem card border-0 rounded-0 color' + imageInfoDict.statColorThree.content + '">';
        let openCardBodyThree = '<div class="card-body p-0 m-3">';
        let cardHeadingThree = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + imageInfoDict.statHeadingThree.content + '</p></div>';
        let closeCardBodyThree = '</div>';
        let closeCardWrapperThree = '</div>';

        // parse for icon
        let imageThreeID = content.get('Statistic 3 Media').getID();
        let cardIconThree = processImage(imageThreeID, imageInfoDict.statIconThree.content);

        // parse for text
        let cardTextThree = (imageInfoDict.statTextThree.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center text-uppercase">' + imageInfoDict.statTextThree.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardThree = openCardWrapperThree + openCardBodyThree + cardHeadingThree + cardIconThree + cardTextThree + closeCardBodyThree + closeCardWrapperThree;

        cardDeck += cardThree;
    }



    /***
     *  Parse for Card four
     * 
     * */
    if (imageInfoDict.statIconFour.content && imageInfoDict.statColorFour.content && imageInfoDict.statHeadingFour.content) {

        // set card defaults
        let openCardWrapperFour = '<div class="cardinfographicItem card border-0 rounded-0 color' + imageInfoDict.statColorFour.content + '">';
        let openCardBodyFour = '<div class="card-body p-0 m-3">';
        let cardHeadingFour = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + imageInfoDict.statHeadingFour.content + '</p></div>';
        let closeCardBodyFour = '</div>';
        let closeCardWrapperFour = '</div>';

        // parse for icon
        let imageFourID = content.get('Statistic 4 Media').getID();
        let cardIconFour = processImage(imageFourID, imageInfoDict.statIconFour.content);

        // parse for text
        let cardTextFour = (imageInfoDict.statTextFour.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center text-uppercase">' + imageInfoDict.statTextFour.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardFour = openCardWrapperFour + openCardBodyFour + cardHeadingFour + cardIconFour + cardTextFour + closeCardBodyFour + closeCardWrapperFour;

        cardDeck += cardFour;
    }




    /***
     *  Parse for Card five
     * 
     * */
    if (imageInfoDict.statIconFive.content && imageInfoDict.statColorFive.content && imageInfoDict.statHeadingFive.content) {

        // set card defaults
        let openCardWrapperFive = '<div class="cardinfographicItem card border-0 rounded-0 color' + imageInfoDict.statColorFive.content + '">';
        let openCardBodyFive = '<div class="card-body p-0 m-3">';
        let cardHeadingFive = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + imageInfoDict.statHeadingFive.content + '</p></div>';
        let closeCardBodyFive = '</div>';
        let closeCardWrapperFive = '</div>';

        // parse for icon
        let imageFiveID = content.get('Statistic 5 Media').getID();
        let cardIconFive = processImage(imageFiveID, imageInfoDict.statIconFive.content);

        // parse for text
        let cardTextFive = (imageInfoDict.statTextFive.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center text-uppercase">' + imageInfoDict.statTextFive.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardFive = openCardWrapperFive + openCardBodyFive + cardHeadingFive + cardIconFive + cardTextFive + closeCardBodyFive + closeCardWrapperFive;

        cardDeck += cardFive;
    }





    /***
     *  write document once
     * 
     * */
    writeDocument(
        [
            beginningHTML,
            anchorString,
            openTitle,
            infographicHeader,
            closeTitle,
            openGroup,
            cardDeck,
            closeGroup,
            openSummary,
            summaryString,
            closeSummary,
            endingHTML
        ]
    );




} catch (err) {
    document.write(err.message);
}