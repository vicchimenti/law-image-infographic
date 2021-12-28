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
 *      @version 5.0
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
        statColorFour: getContentValues('<t4 type="content" name="Statistic 4 Color Combination" output="normal" display_field="value" />'),

        statHeadingFive: getContentValues('<t4 type="content" name="Statistic 5 Heading" output="normal" modifiers="striptags,htmlentities" />'),
        statTextFive: getContentValues('<t4 type="content" name="Statistic 5 Text" output="normal" modifiers="striptags,htmlentities" />'),
        statColorFive: getContentValues('<t4 type="content" name="Statistic 5 Color Combination" output="normal" display_field="value" />'),


        summaryText: getContentValues('<t4 type="content" name="Summary Text" output="normal" modifiers="striptags,htmlentities" />'),
        zoneOption: getContentValues('<t4 type="content" name="Zone Option" output="normal" display_field="value" />'),
        anchortag: getContentValues('<t4 type="meta" meta="html_anchor" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    }






    /***
     *  Initialize defaults
     * 
     * */
    let beginningHTML = '<div class="infographicWrapper iconInfographic contentItem col border-0 g-0 m-0 p-0" id="infographic' + imageInfoDict.contentId.content + '" data-position-default="Main" data-position-selected="' + imageInfoDict.zoneOption.content + '">';
    let anchorString = imageInfoDict.anchortag.content || '<span class="visually-hidden">No Anchor</span>';
    let infographicHeader = '<h2 class="sr-only">Infographic</h2>';
    let openTitle = '<div class="infographicTitle p-3 visually-hidden">';
    let closeTitle = '</div>';
    let cardDeck = '<span class="card visually-hidden"></span>';
    let openGroup = '<div class="infographic card-group flex-column flex-lg-row">';
    let closeGroup = '</div>';
    let summaryString = '<span class="standardContent card-text visually-hidden"></span>';
    let openSummary = '<div class="infographicSummary p-3 visually-hidden">';
    let closeSummary = '</div>';
    let endingHTML = '</div>';


    let imageString = '<span class="imageString hidden visually-hidden" />No Image Provided</span>';
    let openImageWrapper = '<figure class="figure hidden visually-hidden">';
    let closeImageWrapper = '</figure>';



    /***
     *  Parse for title
     * 
     * */
    if (imageInfoDict.infographicTitle.content) {

        beginningHTML = '<div class="infographicWrapper iconInfographic contentItem col border-0 g-0 m-0 p-0" id="infographic' + imageInfoDict.contentId.content + '" data-position-default="Main" data-position-selected="' + imageInfoDict.zoneOption.content + '">';
        openTitle = '<div class="infographicTitle p-3">';
        infographicHeader = '<h2 class="text-center">' + imageInfoDict.infographicTitle.content + '</h2>';
    }




    /***
     *  Parse for Footer
     * 
     * */
    if (imageInfoDict.summaryText.content) {

        openSummary = '<div class="infographicSummary p-3">';
        summaryString = '<p class="summaryText standardContent card-text p-2">' + imageInfoDict.summaryText.content + '</p>';
    }




    /***
     *  Parse for Cards
     *  each card requires a minimum of a number, heading and color combo
     *  Card 1 requires these by default, cards 2 - 4 are enforced logically
     * */
    if (imageInfoDict.statNumOne.content) {

        // set card defaults
        let openCardWrapperOne = '<div class="cardinfographicItem card border-0 rounded-0 color' + imageInfoDict.statColorOne.content + '">';
        let openCardBodyOne = '<div class="card-body p-0 m-3">';
        let cardNumOne = '<div class="infographicItemNumber"><span class="card-text text-center">' + imageInfoDict.statNumOne.content + '</span></div>';
        let cardHeadingOne = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + imageInfoDict.statHeadingOne.content + '</p></div>';
        let closeCardBodyOne = '</div>';
        let closeCardWrapperOne = '</div>';

        // parse for icon
        let cardIconOne = (imageInfoDict.statIconOne.content) ?
            '<div class="infographicItemIcon"><span class="text-center fa ' + imageInfoDict.statIconOne.content + '"></span></div>' :
            '<div class="infographicItemIcon visually-hidden"><span class="visually-hidden">No Icon</span></div>';

        // parse for text
        let cardTextOne = (imageInfoDict.statTextOne.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center">' + imageInfoDict.statTextOne.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';


        let cardOne = openCardWrapperOne + openCardBodyOne + cardIconOne + cardNumOne + cardHeadingOne + cardTextOne + closeCardBodyOne + closeCardWrapperOne;

        cardDeck = cardOne;
    }




    /***
     *  Parse for Card two
     * 
     * */
    if (imageInfoDict.statNumTwo.content && imageInfoDict.statColorTwo.content && imageInfoDict.statHeadingTwo.content) {

        // set card defaults
        let openCardWrapperTwo = '<div class="cardinfographicItem card border-0 rounded-0 color' + imageInfoDict.statColorTwo.content + '">';
        let openCardBodyTwo = '<div class="card-body p-0 m-3">';
        let cardNumTwo = '<div class="infographicItemNumber"><span class="card-text text-center">' + imageInfoDict.statNumTwo.content + '</span></div>';
        let cardHeadingTwo = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + imageInfoDict.statHeadingTwo.content + '</p></div>';
        let closeCardBodyTwo = '</div>';
        let closeCardWrapperTwo = '</div>';

        // parse for icon
        let cardIconTwo = (imageInfoDict.statIconTwo.content) ?
            '<div class="infographicItemIcon"><span class="text-center fa ' + imageInfoDict.statIconTwo.content + '"></span></div>' :
            '<div class="infographicItemIcon visually-hidden"><span class="visually-hidden">No Icon</span></div>';

        // parse for text
        let cardTextTwo = (imageInfoDict.statTextTwo.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center">' + imageInfoDict.statTextTwo.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardTwo = openCardWrapperTwo + openCardBodyTwo + cardIconTwo + cardNumTwo + cardHeadingTwo + cardTextTwo + closeCardBodyTwo + closeCardWrapperTwo;

        cardDeck += cardTwo;
    }




    /***
     *  Parse for Card three
     * 
     * */
    if (imageInfoDict.statNumThree.content && imageInfoDict.statColorThree.content && imageInfoDict.statHeadingThree.content) {

        // set card defaults
        let openCardWrapperThree = '<div class="cardinfographicItem card border-0 rounded-0 color' + imageInfoDict.statColorThree.content + '">';
        let openCardBodyThree = '<div class="card-body p-0 m-3">';
        let cardNumThree = '<div class="infographicItemNumber"><span class="card-text text-center">' + imageInfoDict.statNumThree.content + '</span></div>';
        let cardHeadingThree = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + imageInfoDict.statHeadingThree.content + '</p></div>';
        let closeCardBodyThree = '</div>';
        let closeCardWrapperThree = '</div>';

        // parse for icon
        let cardIconThree = (imageInfoDict.statIconThree.content) ?
            '<div class="infographicItemIcon"><span class="text-center fa ' + imageInfoDict.statIconThree.content + '"></span></div>' :
            '<div class="infographicItemIcon visually-hidden"><span class="visually-hidden">No Icon</span></div>';

        // parse for text
        let cardTextThree = (imageInfoDict.statTextThree.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center">' + imageInfoDict.statTextThree.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardThree = openCardWrapperThree + openCardBodyThree + cardIconThree + cardNumThree + cardHeadingThree + cardTextThree + closeCardBodyThree + closeCardWrapperThree;

        cardDeck += cardThree;
    }



    /***
     *  Parse for Card four
     * 
     * */
    if (imageInfoDict.statNumFour.content && imageInfoDict.statColorFour.content && imageInfoDict.statHeadingFour.content) {

        // set card defaults
        let openCardWrapperFour = '<div class="cardinfographicItem card border-0 rounded-0 color' + imageInfoDict.statColorFour.content + '">';
        let openCardBodyFour = '<div class="card-body p-0 m-3">';
        let cardNumFour = '<div class="infographicItemNumber"><span class="card-text text-center">' + imageInfoDict.statNumFour.content + '</span></div>';
        let cardHeadingFour = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + imageInfoDict.statHeadingFour.content + '</p></div>';
        let closeCardBodyFour = '</div>';
        let closeCardWrapperFour = '</div>';

        // parse for icon
        let cardIconFour = (imageInfoDict.statIconFour.content) ?
            '<div class="infographicItemIcon"><span class="text-center fa ' + imageInfoDict.statIconFour.content + '"></span></div>' :
            '<div class="infographicItemIcon visually-hidden"><span class="visually-hidden">No Icon</span></div>';

        // parse for text
        let cardTextFour = (imageInfoDict.statTextFour.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center">' + imageInfoDict.statTextFour.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardFour = openCardWrapperFour + openCardBodyFour + cardIconFour + cardNumFour + cardHeadingFour + cardTextFour + closeCardBodyFour + closeCardWrapperFour;

        cardDeck += cardFour;
    }




    /***
     *  Parse for Card five
     * 
     * */
    if (imageInfoDict.statNumFive.content && imageInfoDict.statColorFive.content && imageInfoDict.statHeadingFive.content) {

        // set card defaults
        let openCardWrapperFive = '<div class="cardinfographicItem card border-0 rounded-0 color' + imageInfoDict.statColorFive.content + '">';
        let openCardBodyFive = '<div class="card-body p-0 m-3">';
        let cardNumFive = '<div class="infographicItemNumber"><span class="card-text text-center">' + imageInfoDict.statNumFive.content + '</span></div>';
        let cardHeadingFive = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + imageInfoDict.statHeadingFive.content + '</p></div>';
        let closeCardBodyFive = '</div>';
        let closeCardWrapperFive = '</div>';

        // parse for icon
        let cardIconFive = (imageInfoDict.statIconFive.content) ?
            '<div class="infographicItemIcon"><span class="text-center fa ' + imageInfoDict.statIconFive.content + '"></span></div>' :
            '<div class="infographicItemIcon visually-hidden"><span class="visually-hidden">No Icon</span></div>';

        // parse for text
        let cardTextFive = (imageInfoDict.statTextFive.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center">' + imageInfoDict.statTextFive.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardFive = openCardWrapperFive + openCardBodyFive + cardIconFive + cardNumFive + cardHeadingFive + cardTextFive + closeCardBodyFive + closeCardWrapperFive;

        cardDeck += cardFive;
    }




    /***
     *  Parse for image
     * 
     * */
    if (majorDict.frontPageImage.content) {

        let imageID = content.get('Main Image').getID();
        let mediaInfo = getMediaInfo(imageID);
        let media = readMedia(imageID);
        let info = new ImageInfo;
        info.setInput(media);

        let imageDefaultAlt = majorDict.frontPageImageCaption.content ? majorDict.frontPageImageCaption.content : majorDict.articleTitle.content;

        imageString = (info.check()) ?
            '<img src="' + majorDict.frontPageImage.content + '" class="articleImage figure-img card-img-top" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />' :
            '<img src="' + majorDict.frontPageImage.content + '" class="articleImage figure-img card-img-top" alt="' + imageDefaultAlt + '" loading="auto" />';

        openImageWrapper = '<figure class="figure">';
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