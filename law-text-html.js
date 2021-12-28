/***
 *      @author Victor Chimenti, MSCS
 *      @see Seattle University School of Law
 *      @file law-text-html.js
 *          Law - Icon Infographic
 *          ID: 5608
 *
 *      This content type displays from 1 to 5 infographic cards
 *
 *      Document will write once when the page loads
 *
 *      @version 4.9
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
    let infoDict = {

        itemName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        infographicTitle: getContentValues('<t4 type="content" name="Infographic Title" output="normal" modifiers="striptags,htmlentities" />'),
        statNumOne: getContentValues('<t4 type="content" name="Statistic 1 Number" output="normal" modifiers="striptags,htmlentities" />'),
        statIconOne: getContentValues('<t4 type="content" name="Statistic 1 Icon" output="normal" display_field="value" />'),
        statHeadingOne: getContentValues('<t4 type="content" name="Statistic 1 Heading" output="normal" modifiers="striptags,htmlentities" />'),
        statTextOne: getContentValues('<t4 type="content" name="Statistic 1 Text" output="normal" modifiers="striptags,htmlentities" />'),
        statColorOne: getContentValues('<t4 type="content" name="Statistic 1 Color Combination" output="normal" display_field="value" />'),
        statNumTwo: getContentValues('<t4 type="content" name="Statistic 2 Number" output="normal" modifiers="striptags,htmlentities" />'),
        statIconTwo: getContentValues('<t4 type="content" name="Statistic 2 Icon" output="normal" display_field="value" />'),
        statHeadingTwo: getContentValues('<t4 type="content" name="Statistic 2 Heading" output="normal" modifiers="striptags,htmlentities" />'),
        statTextTwo: getContentValues('<t4 type="content" name="Statistic 2 Text" output="normal" modifiers="striptags,htmlentities" />'),
        statColorTwo: getContentValues('<t4 type="content" name="Statistic 2 Color Combination" output="normal" display_field="value" />'),
        statNumThree: getContentValues('<t4 type="content" name="Statistic 3 Number" output="normal" modifiers="striptags,htmlentities" />'),
        statIconThree: getContentValues('<t4 type="content" name="Statistic 3 Icon" output="normal" display_field="value" />'),
        statHeadingThree: getContentValues('<t4 type="content" name="Statistic 3 Heading" output="normal" modifiers="striptags,htmlentities" />'),
        statTextThree: getContentValues('<t4 type="content" name="Statistic 3 Text" output="normal" modifiers="striptags,htmlentities" />'),
        statColorThree: getContentValues('<t4 type="content" name="Statistic 3 Color Combination" output="normal" display_field="value" />'),
        statNumFour: getContentValues('<t4 type="content" name="Statistic 4 Number" output="normal" modifiers="striptags,htmlentities" />'),
        statIconFour: getContentValues('<t4 type="content" name="Statistic 4 Icon" output="normal" display_field="value" />'),
        statHeadingFour: getContentValues('<t4 type="content" name="Statistic 4 Heading" output="normal" modifiers="striptags,htmlentities" />'),
        statTextFour: getContentValues('<t4 type="content" name="Statistic 4 Text" output="normal" modifiers="striptags,htmlentities" />'),
        statColorFour: getContentValues('<t4 type="content" name="Statistic 4 Color Combination" output="normal" display_field="value" />'),

        statNumFive: getContentValues('<t4 type="content" name="Statistic 5 Number" output="normal" modifiers="striptags,htmlentities" />'),
        statIconFive: getContentValues('<t4 type="content" name="Statistic 5 Icon" output="normal" display_field="value" />'),
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
    let beginningHTML = '<div class="infographicWrapper iconInfographic contentItem col border-0 g-0 m-0 p-0" id="infographic' + infoDict.contentId.content + '" data-position-default="Main" data-position-selected="' + infoDict.zoneOption.content + '">';
    let anchorString = infoDict.anchortag.content || '<span class="visually-hidden">No Anchor</span>';
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



    /***
     *  Parse for title
     * 
     * */
    if (infoDict.infographicTitle.content) {

        beginningHTML = '<div class="infographicWrapper iconInfographic contentItem col border-0 g-0 m-0 p-0" id="infographic' + infoDict.contentId.content + '" data-position-default="Main" data-position-selected="' + infoDict.zoneOption.content + '">';
        openTitle = '<div class="infographicTitle p-3">';
        infographicHeader = '<h2 class="text-center">' + infoDict.infographicTitle.content + '</h2>';
    }




    /***
     *  Parse for Footer
     * 
     * */
    if (infoDict.summaryText.content) {

        openSummary = '<div class="infographicSummary p-3">';
        summaryString = '<p class="summaryText standardContent card-text p-2">' + infoDict.summaryText.content + '</p>';
    }




    /***
     *  Parse for Cards
     *  each card requires a minimum of a number, heading and color combo
     *  Card 1 requires these by default, cards 2 - 4 are enforced logically
     * */
    if (infoDict.statNumOne.content) {

        // set card defaults
        let openCardWrapperOne = '<div class="cardinfographicItem card border-0 rounded-0 color' + infoDict.statColorOne.content + '">';
        let openCardBodyOne = '<div class="card-body p-0 m-3">';
        let cardNumOne = '<div class="infographicItemNumber"><span class="card-text text-center">' + infoDict.statNumOne.content + '</span></div>';
        let cardHeadingOne = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + infoDict.statHeadingOne.content + '</p></div>';
        let closeCardBodyOne = '</div>';
        let closeCardWrapperOne = '</div>';

        // parse for icon
        let cardIconOne = (infoDict.statIconOne.content) ?
            '<div class="infographicItemIcon"><span class="text-center fa ' + infoDict.statIconOne.content + '"></span></div>' :
            '<div class="infographicItemIcon visually-hidden"><span class="visually-hidden">No Icon</span></div>';

        // parse for text
        let cardTextOne = (infoDict.statTextOne.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center">' + infoDict.statTextOne.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';


        let cardOne = openCardWrapperOne + openCardBodyOne + cardIconOne + cardNumOne + cardHeadingOne + cardTextOne + closeCardBodyOne + closeCardWrapperOne;

        cardDeck = cardOne;
    }




    /***
     *  Parse for Card two
     * 
     * */
    if (infoDict.statNumTwo.content && infoDict.statColorTwo.content && infoDict.statHeadingTwo.content) {

        // set card defaults
        let openCardWrapperTwo = '<div class="cardinfographicItem card border-0 rounded-0 color' + infoDict.statColorTwo.content + '">';
        let openCardBodyTwo = '<div class="card-body p-0 m-3">';
        let cardNumTwo = '<div class="infographicItemNumber"><span class="card-text text-center">' + infoDict.statNumTwo.content + '</span></div>';
        let cardHeadingTwo = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + infoDict.statHeadingTwo.content + '</p></div>';
        let closeCardBodyTwo = '</div>';
        let closeCardWrapperTwo = '</div>';

        // parse for icon
        let cardIconTwo = (infoDict.statIconTwo.content) ?
            '<div class="infographicItemIcon"><span class="text-center fa ' + infoDict.statIconTwo.content + '"></span></div>' :
            '<div class="infographicItemIcon visually-hidden"><span class="visually-hidden">No Icon</span></div>';

        // parse for text
        let cardTextTwo = (infoDict.statTextTwo.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center">' + infoDict.statTextTwo.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardTwo = openCardWrapperTwo + openCardBodyTwo + cardIconTwo + cardNumTwo + cardHeadingTwo + cardTextTwo + closeCardBodyTwo + closeCardWrapperTwo;

        cardDeck += cardTwo;
    }




    /***
     *  Parse for Card three
     * 
     * */
    if (infoDict.statNumThree.content && infoDict.statColorThree.content && infoDict.statHeadingThree.content) {

        // set card defaults
        let openCardWrapperThree = '<div class="cardinfographicItem card border-0 rounded-0 color' + infoDict.statColorThree.content + '">';
        let openCardBodyThree = '<div class="card-body p-0 m-3">';
        let cardNumThree = '<div class="infographicItemNumber"><span class="card-text text-center">' + infoDict.statNumThree.content + '</span></div>';
        let cardHeadingThree = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + infoDict.statHeadingThree.content + '</p></div>';
        let closeCardBodyThree = '</div>';
        let closeCardWrapperThree = '</div>';

        // parse for icon
        let cardIconThree = (infoDict.statIconThree.content) ?
            '<div class="infographicItemIcon"><span class="text-center fa ' + infoDict.statIconThree.content + '"></span></div>' :
            '<div class="infographicItemIcon visually-hidden"><span class="visually-hidden">No Icon</span></div>';

        // parse for text
        let cardTextThree = (infoDict.statTextThree.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center">' + infoDict.statTextThree.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardThree = openCardWrapperThree + openCardBodyThree + cardIconThree + cardNumThree + cardHeadingThree + cardTextThree + closeCardBodyThree + closeCardWrapperThree;

        cardDeck += cardThree;
    }



    /***
     *  Parse for Card four
     * 
     * */
    if (infoDict.statNumFour.content && infoDict.statColorFour.content && infoDict.statHeadingFour.content) {

        // set card defaults
        let openCardWrapperFour = '<div class="cardinfographicItem card border-0 rounded-0 color' + infoDict.statColorFour.content + '">';
        let openCardBodyFour = '<div class="card-body p-0 m-3">';
        let cardNumFour = '<div class="infographicItemNumber"><span class="card-text text-center">' + infoDict.statNumFour.content + '</span></div>';
        let cardHeadingFour = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + infoDict.statHeadingFour.content + '</p></div>';
        let closeCardBodyFour = '</div>';
        let closeCardWrapperFour = '</div>';

        // parse for icon
        let cardIconFour = (infoDict.statIconFour.content) ?
            '<div class="infographicItemIcon"><span class="text-center fa ' + infoDict.statIconFour.content + '"></span></div>' :
            '<div class="infographicItemIcon visually-hidden"><span class="visually-hidden">No Icon</span></div>';

        // parse for text
        let cardTextFour = (infoDict.statTextFour.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center">' + infoDict.statTextFour.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardFour = openCardWrapperFour + openCardBodyFour + cardIconFour + cardNumFour + cardHeadingFour + cardTextFour + closeCardBodyFour + closeCardWrapperFour;

        cardDeck += cardFour;
    }




    /***
     *  Parse for Card five
     * 
     * */
    if (infoDict.statNumFive.content && infoDict.statColorFive.content && infoDict.statHeadingFive.content) {

        // set card defaults
        let openCardWrapperFive = '<div class="cardinfographicItem card border-0 rounded-0 color' + infoDict.statColorFive.content + '">';
        let openCardBodyFive = '<div class="card-body p-0 m-3">';
        let cardNumFive = '<div class="infographicItemNumber"><span class="card-text text-center">' + infoDict.statNumFive.content + '</span></div>';
        let cardHeadingFive = '<div class="infographicItemHeader"><p class="card-title text-center text-uppercase">' + infoDict.statHeadingFive.content + '</p></div>';
        let closeCardBodyFive = '</div>';
        let closeCardWrapperFive = '</div>';

        // parse for icon
        let cardIconFive = (infoDict.statIconFive.content) ?
            '<div class="infographicItemIcon"><span class="text-center fa ' + infoDict.statIconFive.content + '"></span></div>' :
            '<div class="infographicItemIcon visually-hidden"><span class="visually-hidden">No Icon</span></div>';

        // parse for text
        let cardTextFive = (infoDict.statTextFive.content) ?
            '<div class="infographicItemText standardContent card-text"><p class="card-title text-center">' + infoDict.statTextFive.content + '</p></div>' :
            '<div class="infographicItemText visually-hidden"><span class="visually-hidden">No Text</span></div>';

        let cardFive = openCardWrapperFive + openCardBodyFive + cardIconFive + cardNumFive + cardHeadingFive + cardTextFive + closeCardBodyFive + closeCardWrapperFive;

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