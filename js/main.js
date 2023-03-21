class GetDataFromApi {
    url = "";
    data = null;

    constructor(newURL) {
        this.url = newURL;
    }

    async getData() {
        await fetch(this.url)
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.data = data;
            });
        return this.data;
    }
}

class Header {
    headerElement;
    figureElement;
    logoIElement;
    logoHeadingElement;
    avatarWrapperElement;
    avatarBodyElement;
    avatarHeadElement;
    avatarElement;
    placeToRenderHeader;

    constructor(placeToRenderHeader) {
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.figureElement = document.createElement("figure");
        this.figureElement.classList = "header__logo";

        this.logoIElement = document.createElement("i");
        this.logoIElement.classList = "fa-solid fa-money-bill-transfer";

        this.logoHeadingElement = document.createElement("h1");
        this.logoHeadingElement.classList = "header__banky";
        this.logoHeadingElement.innerText = "Banky";

        this.avatarWrapperElement = document.createElement("div");
        this.avatarWrapperElement.classList = "avatarWrapper";

        this.avatarElement = document.createElement("figure");
        this.avatarElement.classList = "avatar";

        this.avatarHeadElement = document.createElement("div");
        this.avatarHeadElement.classList = "avatar__head";

        this.avatarBodyElement = document.createElement("div");
        this.avatarBodyElement.classList = "avatar__body";

    }

    render() {
        this.headerElement.appendChild(this.figureElement);
        this.figureElement.appendChild(this.logoIElement);
        this.figureElement.appendChild(this.logoHeadingElement);
        this.headerElement.appendChild(this.avatarWrapperElement);
        this.avatarWrapperElement.appendChild(this.avatarElement);
        this.avatarElement.appendChild(this.avatarHeadElement);
        this.avatarElement.appendChild(this.avatarBodyElement);
        this.placeToRenderHeader.appendChild(this.headerElement);
    }
}

class BankyMain {
    placeToRenderBankyMain;
    leftSection;
    rightSection;

    constructor(placeToRenderBankyMain) {
        this.placeToRenderBankyMain = document.getElementsByTagName(placeToRenderBankyMain)[0];

        this.mainElement = document.createElement("main");
        this.mainElement.classList = "banky";

        this.leftSection = new BankyLeftSection(this.mainElement);
        this.rightSection = new BankyRightSection(this.mainElement);

    }

    makeButtonsFromData(data) {
        this.rightSection.makeButtonsFromData(data);
    }

    makeTransactionsFromData(data) {
        this.leftSection.makeTransactionsFromData("Bankrekening", data);
    }

    render() {
        this.placeToRenderBankyMain.appendChild(this.mainElement);
        this.leftSection.render();
        this.rightSection.render();
    }
}

class BankyLeftSection {
    mainElement;
    constructor(mainElement) {
        this.mainElement = mainElement;
        this.leftSectionElement = document.createElement("section");
        this.leftSectionElement.classList = "banky__section banky__section--left";

        this.bankyHeaderElement = document.createElement("header");
        this.bankyHeaderElement.classList = "banky__header";

        this.bankyHeaderWrapElement = document.createElement("div");

        this.bankyLogoElement = document.createElement("figure");
        this.bankyLogoElement.classList = "banky__logo";

        this.bankyLogoIElement = document.createElement("i");
        this.bankyLogoIElement.classList = "fa-solid fa-house";

        this.bankyLogoText = document.createElement("h1");
        this.bankyLogoText.classList = "banky__money";
        this.bankyLogoText.innerText = "Saldo 10"

        this.eyeButton = document.createElement("button");
        this.eyeButton.classList = "banky__eyeButton";

        this.eyeFigure = document.createElement("figure");
        this.eyeFigure.classList = "banky__eye";

        this.eyeI = document.createElement("i");
        this.eyeI.classList = "fa-solid fa-eye";

        this.transactionsElement = document.createElement("ul");
        this.transactionsElement.classList = "banky__transactions";
    }

    makeTransactionsFromData(accountToShow, data) {
        let totalMoney = 0;
        for (let i = 0; i < data[accountToShow].length; i++){
            totalMoney += data[accountToShow][i]["amouth"];
        }

        
        this.bankyLogoText.innerText = "Saldo " + "€" + totalMoney;


        for (let i = 0; i < data[accountToShow].length; i++) {
            this.transactionElement = document.createElement("li");
            this.transactionElement.classList = "banky__transaction";

            this.transactionFrom = document.createElement("h3");
            this.transactionFrom.classList = "banky__name";
            this.transactionFrom.innerText = data[accountToShow][i]["from/to"];

            this.transactionAmount = document.createElement("h3");
            this.transactionAmount.classList = "banky__amount";
            this.transactionAmount.innerText = data[accountToShow][i]["amouth"];

            this.transactionsElement.appendChild(this.transactionElement);
            this.transactionElement.appendChild(this.transactionFrom);
            this.transactionElement.appendChild(this.transactionAmount);
        }

        this.transferButton = document.createElement("button");
        this.transferButton.classList = "banky__transferButton";
        this.transferButton.innerText = "Overboeken";
        this.leftSectionElement.appendChild(this.transferButton);

    }
    render() {
        this.mainElement.appendChild(this.leftSectionElement);
        this.leftSectionElement.appendChild(this.bankyHeaderElement);
        this.bankyHeaderElement.appendChild(this.bankyHeaderWrapElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoElement);
        this.bankyLogoElement.appendChild(this.bankyLogoIElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoText);
        this.bankyHeaderWrapElement.appendChild(this.eyeButton);
        this.eyeButton.appendChild(this.eyeFigure);
        this.eyeFigure.appendChild(this.eyeI);
        this.leftSectionElement.appendChild(this.transactionsElement);
    }
}

class BankyRightSection {
    mainElement;
    constructor(mainElement) {
        this.mainElement = mainElement;
        this.rightSectionElement = document.createElement("section");
        this.rightSectionElement.classList = "banky__section bankt__section--right";

        this.bankyAccountsElement = document.createElement("ul");
        this.bankyAccountsElement.classList = "banky__accounts";

        // this.BankyAccountElement2 = document.createElement("li");
        // this.BankyAccountElement2.classList = "banky__account";

        // this.SwitchAccountButtonElement2 = document.createElement("button");
        // this.SwitchAccountButtonElement2.classList = "banky__switchAccount";

        // this.BankyRightLogoElement2 = document.createElement("figure");
        // this.BankyRightLogoElement2.classList = "banky__logo";

        // this.BankyRightLogoIconElement2 = document.createElement("i");
        // this.BankyRightLogoIconElement2.classList = "fa-solid fa-mug-hot";

        // this.BankyBankrekeningElement2 = document.createElement("h4");
        // this.BankyBankrekeningElement2.classList = "banky__nameOfAccount";
        // this.BankyBankrekeningElement2.innerText = "ZZP-Rekening";
    }

    makeButtonsFromData(data) {
        Object.entries(data).forEach((entry) => {
            this.BankyAccountElement = document.createElement("li");
            this.BankyAccountElement.classList = "banky__account";
            this.BankyAccountElement.onclick = () => {
                console.log(entry);
            }

            this.SwitchAccountButtonElement = document.createElement("button");
            this.SwitchAccountButtonElement.classList = "banky__switchAccount";

            this.BankyRightLogoElement = document.createElement("figure");
            this.BankyRightLogoElement.classList = "banky__logo";

            this.BankyRightLogoIconElement = document.createElement("i");
            this.BankyRightLogoIconElement.classList = "fa-solid fa-house";

            this.BankyBankrekeningElement = document.createElement("h4");
            this.BankyBankrekeningElement.classList = "banky__nameOfAccount";
            this.BankyBankrekeningElement.innerText = entry[0];

            this.bankyAccountsElement.appendChild(this.BankyAccountElement);
            this.BankyAccountElement.appendChild(this.SwitchAccountButtonElement);
            this.SwitchAccountButtonElement.appendChild(this.BankyRightLogoElement);
            this.BankyRightLogoElement.appendChild(this.BankyRightLogoIconElement);
            this.BankyAccountElement.appendChild(this.BankyBankrekeningElement);
        })
    }

    render() {
        this.mainElement.appendChild(this.rightSectionElement);
        this.rightSectionElement.appendChild(this.bankyAccountsElement);
        // this.bankyAccountsElement.appendChild(this.BankyAccountElement2);
        // this.BankyAccountElement2.appendChild(this.SwitchAccountButtonElement2);
        // this.SwitchAccountButtonElement2.appendChild(this.BankyRightLogoElement2);
        // this.BankyRightLogoElement2.appendChild(this.BankyRightLogoIconElement2);
        // this.BankyAccountElement2.appendChild(this.BankyBankrekeningElement2);
    }
}

class App {
    bankyHeader;
    bankyMain;
    GetDataFromApi;

    constructor() {
        this.header = new Header("body");
        this.bankyMain = new BankyMain("body");

        this.GetDataFromApi = new GetDataFromApi("./data/transactions.json");
        this.GetDataFromApi
            .getData().then((data) => {
                this.bankyMain.makeTransactionsFromData(data);
                this.bankyMain.makeButtonsFromData(data);
            });

        this.header.render();
        this.bankyMain.render();
    }
}

const app = new App();