require([
    "esri/portal/Portal",
    "esri/portal/PortalItem",
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager",
    "esri/portal/PortalQueryParams",
    "esri/core/lang",
    "dojo/on"
], function (
    Portal,
    PortalItem,
    OAuthInfo,
    esriId,
    PortalQueryParams,
    esriLang,
    on
) {

    // create a card template to display Portal Item Information
    const template = `
    <div data-itemid="{id}">
    <article class="card"><img src="{thumbnailUrl}" alt="Card Thumbnail">
        <hr>
        <h6>{title}</h6>
        <ul class="card-info">
        <li>{created}</li>
        <li>{owner}</li>
        </ul>
        <div class="item-link">
        <a class="btn btn-sm btn-default" href="https://{owner}.maps.arcgis.com/home/item.html?id={id}" target="_blank">Open</a>
        </div>
    </article>
    </div>
    `;

    // container to hold our cards
    const $cardsList = document.querySelector(".cards-list");
    const info = new OAuthInfo({ //信息已经过期了！！！
        appId: "zppZ53G093yZV7tG",
        popup: false
    });
    // Add the OAuthInfo to IdentityManager
    esriId.registerOAuthInfos([info]);
    // now set up the Portal
    const portal = new Portal({
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html#authMode
        authMode: "immediate"
    });
    // Will trigger a login if the user is not already
    // logged in via this application
    portal.load().then(() => { //当portal load完了, 就发请求
        const queryParams = new PortalQueryParams({ 
            query: `owner:${portal.user.username}`, 
            sortField: "numViews",
            sortOrder: "desc",
            num: 20
        });
        return portal.queryItems(queryParams);
    }).then(({ results }) => {
        let docFrag = document.createDocumentFragment();
        // Iterate over each item to create a card for it
        results.forEach(item => {
            // esri/lang::substitute will create a new string using the PortalItem.
            const card = esriLang.substitute(item, template);
            const elem = document.createElement("div");
            elem.className = "portal-item";
            elem.innerHTML = card;
            docFrag.appendChild(elem);
        });
        // Append the completed list to the page.
        $cardsList.appendChild(docFrag);
        docFrag = undefined;
    });
});