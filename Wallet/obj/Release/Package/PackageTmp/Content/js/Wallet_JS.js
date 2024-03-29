﻿var Url = "169.50.169.11";
var Port = "8081";
var Monitor = "r3";
var Public, Private;

window.onload = function () {
    Myconnect();
    index();
    this.document.getElementById("Net").onchange();
};

function SetUrl(el) {
    Url = el.options[el.selectedIndex].value;
    Monitor = el.options[el.selectedIndex].attributes["mon"].value;

    if (el.options[el.selectedIndex].value === "Update") {

        document.getElementById("Work").innerText = "";
        let h2 = document.createElement("h2");
        h2.style = "margin:200px auto; width: 300px; text-align: center;";
        h2.innerText = "Network update";
        document.getElementById("Work").appendChild(h2);
        return;
    }

    if (document.getElementById("Work").children[0].innerText === "Network update") {
        document.getElementById("Work").innerText = "";
        index();
        return;
    }

    el = document.getElementById("MonitorHistory");
    if (el !== null && Public !== undefined) {
        el.attributes["href"].value = "https://monitor.credits.com/" + Monitor + "/account/" + Base58.encode(Public);
    }
    UpdateBalance();
}

function index() {
    let Text = Resourse();


    let Background = document.createElement("div");
    Background.className = "bg-block text-center";

    let Count = document.createElement("div");
    Count.className = "content_main centered_column";
    Background.appendChild(Count);

    let h2 = document.createElement("h2");
    h2.className = "main";
    h2.innerText = Text.index_title;
    Count.appendChild(h2);

    let div = document.createElement("div");
    div.className = "mb-50";

    let p = document.createElement("p");
    p.className = "main";
    p.innerText = Text.index_Desc_1;
    div.appendChild(p);

    p = document.createElement("p");
    p.className = "main";
    p.innerText = Text.index_Desc_2;
    div.appendChild(p);

    Count.appendChild(div);

    div = document.createElement("div");
    div.className = "row w-650 around align-bottom mobile-center top_block";

    Count.appendChild(div);

    let div2 = document.createElement("div");
    div.appendChild(div2);

    let div3 = document.createElement("div");
    div3.className = "margin_top_20";
    div2.appendChild(div3);

    let a = document.createElement("a");
    a.className = "bold-link bttn2 whiter-c";
    a.onclick = RenderKey;
    a.innerText = Text.index_button_1;
    div3.appendChild(a);

    div2 = document.createElement("div");
    div.appendChild(div2);

    div3 = document.createElement("div");
    div3.className = "margin_top_20";
    div2.appendChild(div3);

    a = document.createElement("a");
    a.className = "bold-link bttn whiter-w";
    a.onclick = SignIn;
    a.innerText = Text.index_button_2;
    div3.appendChild(a);

    document.getElementById("Work").appendChild(Background);

    Background = document.createElement("div");
    Background.className = "content_main pb-20";

    h2 = document.createElement("h2");
    h2.className = "title text-center";
    h2.innerText = Text.index_h2_2;
    Background.appendChild(h2);

    div = document.createElement("div");
    div.className = "row around  mobile-column mobile-center";

    div2 = document.createElement("div");
    div2.className = "feature";
    div.appendChild(div2);

    let img = document.createElement("img");
    img.className = "feature__img";
    img.src = "../../Content/image/index/main-01-01.svg";
    div2.appendChild(img);

    div3 = document.createElement("div");
    div3.className = "feature__title";
    div3.innerText = Text.index_Desc_3;
    div2.appendChild(div3);


    div2 = document.createElement("div");
    div2.className = "feature";
    div.appendChild(div2);

    img = document.createElement("img");
    img.className = "feature__img";
    img.src = "../../Content/image/index/main-02-01.svg";
    div2.appendChild(img);

    div3 = document.createElement("div");
    div3.className = "feature__title";
    div3.innerText = Text.index_Desc_4;
    div2.appendChild(div3);


    div2 = document.createElement("div");
    div2.className = "feature";
    div.appendChild(div2);

    img = document.createElement("img");
    img.className = "feature__img";
    img.src = "../../Content/image/index/main-02-01.svg";
    div2.appendChild(img);

    div3 = document.createElement("div");
    div3.className = "feature__title";
    div3.innerText = Text.index_Desc_5;
    div2.appendChild(div3);


    div2 = document.createElement("div");
    div2.className = "feature";
    div.appendChild(div2);

    img = document.createElement("img");
    img.className = "feature__img";
    img.src = "../../Content/image/index/main-03-01.svg";
    div2.appendChild(img);

    div3 = document.createElement("div");
    div3.className = "feature__title";
    div3.innerText = Text.index_Desc_6;
    div2.appendChild(div3);

    Background.appendChild(div);

    document.getElementById("Work").appendChild(Background);

    Background = document.createElement("div");
    Background.className = "bg-grey pt-40 pb-40";
    Background.style = "margin-bottom: -200px;";

    div = document.createElement("div");
    div.className = "content_main";
    Background.appendChild(div);

    h2 = document.createElement("h2");
    h2.className = "title text-center mb-20";
    h2.innerText = Text.index_h2_3;
    div.appendChild(h2);

    div2 = document.createElement("div");
    div2.className = "mx-auto";
    div.appendChild(div2);

    p = document.createElement("p");
    p.className = "main pb-20";
    p.innerText = Text.index_Desc_7;
    div2.appendChild(p);

    p = document.createElement("p");
    p.className = "main pb-20";
    p.innerText = Text.index_Desc_8;
    div2.appendChild(p);

    document.getElementById("Work").appendChild(Background);
}

function RenderKey() {
    let Text = Resourse();

    document.getElementById("Work").innerHTML = "";

    let Cont = document.createElement("div");
    Cont.className = "row content content-inner";

    let div = document.createElement("div");
    div.className = "left-bar";
    Cont.appendChild(div);

    div.appendChild(Faq());

    div = document.createElement("div");
    div.className = "w-content";
    Cont.appendChild(div);

    //let form = document.createElement("div");
    //form.id = "FormaPassword";
    //div.appendChild(form);

    //let h1 = document.createElement("h1");
    //h1.innerText = Text.RenderKey_h1_1;
    //form.appendChild(h1);

    //let p = document.createElement("p");
    //p.innerText = Text.RenderKey_p_1;
    //form.appendChild(p);

    //p = document.createElement("p");
    //p.innerText = Text.RenderKey_p_2;
    //p.className = "textColorRed";
    //form.appendChild(p);

    //let div2 = document.createElement("div");
    //div2.id = "PasswordField_box";
    //form.appendChild(div2);

    //let input = document.createElement("input");
    //input.id = "Password";
    //input.className = "main-input";
    //input.type = "Password";
    //input.placeholder = Text.RenderKey_input_placeholder;
    //div2.appendChild(input);

    //p = document.createElement("p");
    //p.id = "ErrorPassword";
    //p.className = "textColorRed";
    //form.appendChild(p);

    //let img = document.createElement("img");
    //img.src = "../../Content/image/icon/icons8-invisible.png";
    //img.className = "PasswordField_Img1";
    //img.onclick = VisiblePassword;
    //div2.appendChild(img);

    //img = document.createElement("img");
    //img.src = "../../Content/image/icon/icons8-visible.png";
    //img.className = "PasswordField_Img2 displayNone";
    //img.onclick = InVisiblePassword;
    //div2.appendChild(img);

    //p = document.createElement("h2");
    //p.innerText = Text.RenderKey_p_3;
    //form.appendChild(p);

    //p = document.createElement("p");
    //p.className = "tet_bold";
    //form.appendChild(p);

    //let button = document.createElement("a");
    //button.className = "bold-link bttn margin_top_20";
    //button.innerText = Text.RenderKey_button_1;
    //button.onclick = PopapRegister;
    //p.appendChild(button);

    document.getElementById("Work").appendChild(Cont);

    PopapRegister();
}

function VisiblePassword() {
    document.getElementById("Password").type = "text";
    document.getElementsByClassName("PasswordField_Img1")[0].classList.add("displayNone");
    document.getElementsByClassName("PasswordField_Img2")[0].classList.remove("displayNone");
}

function InVisiblePassword() {
    document.getElementById("Password").type = "Password";
    document.getElementsByClassName("PasswordField_Img2")[0].classList.add("displayNone");
    document.getElementsByClassName("PasswordField_Img1")[0].classList.remove("displayNone");
}

function NewKey() {
    document.getElementsByClassName("popup-bg")[0].remove();

    //var Pasword = document.getElementById("Password");
    //document.getElementById("ErrorPassword").innerText = "";

    let Text = Resourse();

    //if (Pasword.value === "") {
    //    document.getElementById("ErrorPassword").innerText = Text.RenderKey_input_Error_1;
    //    return;
    //}

    let signPair = nacl.sign.keyPair();
    let PublicKey = Base58.encode(signPair.publicKey);
    let PrivateKey = Base58.encode(signPair.secretKey);

    var str = {
        key: {
            public: PublicKey,
            private: PrivateKey
        }
    };

    DownloadFile("key.json", JSON.stringify(str));

    document.getElementsByClassName("w-content")[0].innerHTML = "";

    let div = document.createElement("div");
    div.id = "FormaPassword";

    let h1 = document.createElement("h1");
    h1.className = "title";
    h1.innerText = Text.NewKey_h1_1;
    div.appendChild(h1);

    let p = document.createElement("p");
    p.innerText = Text.NewKey_p_1;
    div.appendChild(p);

    let h2 = document.createElement("h2");
    h2.innerText = Text.NewKey_h2_1;
    div.appendChild(h2);

    let label = document.createElement("p");
    label.innerText = Text.NewKey_label_1;
    div.appendChild(label);

    let input = document.createElement("input");
    input.className = "main-input";
    input.id = "Public";
    input.value = PublicKey;
    div.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorPub";
    div.appendChild(p);

    label = document.createElement("p");
    label.innerText = Text.NewKey_label_2;
    div.appendChild(label);

    input = document.createElement("input");
    input.className = "main-input";
    input.id = "Private";
    input.value = PrivateKey;
    div.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorPriv";
    div.appendChild(p);

    p = document.createElement("p");
    p.innerText = Text.NewKey_inportant;
    p.className = "textColorRed";
    div.appendChild(p);

    let div2 = document.createElement("p");
    div2.className = "fontBold";
    div.appendChild(div2);

    let button = document.createElement("a");
    button.className = "bold-link bttn margin_top_20";
    button.innerText = Text.NewKey_button_1;
    button.onclick = OpenAcc;
    div2.appendChild(button);

    document.getElementsByClassName("w-content")[0].appendChild(div);
}

function SignIn(CallEv) {
    let Text = Resourse();

    document.getElementById("Work").innerHTML = "";

    let Cont = document.createElement("div");
    Cont.className = "row content content-inner";

    let div = document.createElement("div");
    div.className = "left-bar";
    Cont.appendChild(div);

    div.appendChild(Faq());

    div = document.createElement("div");
    div.className = "w-content";
    Cont.appendChild(div);

    let div2 = document.createElement("div");
    div2.id = "FormaPassword";
    div.appendChild(div2);

    let h1 = document.createElement("h1");
    switch (CallEv) {
        case "Token":
            h1.innerText = Text.SignIn_h1_1_InTock;
            break;
        case "Smart":
            h1.innerText = Text.SignIn_h1_1_InSmart;
            break;
        default:
            h1.innerText = Text.SignIn_h1_1;
    }
    div2.appendChild(h1);

    let p = document.createElement("p");
    p.innerText = Text.SignIn_p_1;
    div2.appendChild(p);

    let h2 = document.createElement("h2");
    h2.innerText = Text.SignIn_h2_1;
    div2.appendChild(h2);

    p = document.createElement("p");
    p.innerText = Text.SignIn_p_2;
    div2.appendChild(p);

    let label = document.createElement("p");
    label.innerText = Text.SignIn_label_1;
    div2.appendChild(label);

    let input = document.createElement("input");
    input.className = "main-input";
    input.id = "Public";
    input.placeholder = Text.SignIn_input_placeholder_1;
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorPub";
    div2.appendChild(p);

    label = document.createElement("p");
    label.innerText = Text.SignIn_label_2;
    div2.appendChild(label);

    input = document.createElement("input");
    input.className = "main-input";
    input.id = "Private";
    input.placeholder = Text.SignIn_input_placeholder_2;
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorPriv";
    div2.appendChild(p);

    let div3 = document.createElement("p");
    div3.className = "fontBold";
    div2.appendChild(div3);

    let button = document.createElement("a");
    button.className = "bold-link bttn margin_top_20";
    button.innerText = Text.SignIn_button_1;
    button.id = "OpenAcc";
    button.onclick = OpenAcc.bind(this, CallEv);
    div3.appendChild(button);

    h2 = document.createElement("h2");
    h2.innerText = Text.SignIn_h2_2;
    div2.appendChild(h2);

    div3 = document.createElement("p");
    div3.className = "fontBold";
    div2.appendChild(div3);

    button = document.createElement("a");
    button.className = "bold-link bttn margin_top_20";
    button.innerText = Text.SignIn_button_2;
    button.onclick = InputFile;
    div3.appendChild(button);

    p = document.createElement("p");
    p.id = "ErrorFileKey";
    p.className = "textColorRed";
    div2.appendChild(p);

    let El = document.createElement("input");
    El.style = "display:none;";
    El.id = "KeyFile";
    El.type = "file";
    El.onchange = ReadFile;
    div2.appendChild(El);

    document.getElementById("Work").appendChild(Cont);
}

function OpenAcc(CallEv, el) {
    let ErrorPub = document.getElementById("ErrorPub");
    let ErrorPriv = document.getElementById("ErrorPriv");

    ErrorPub.innerText = "";
    ErrorPriv.innerText = "";

    Public = document.getElementById("Public").value;
    Private = document.getElementById("Private").value;

    let Text = Resourse();

    if (Public === "") {
        ErrorPub.innerText = Text.SignIn_input_error_1;
        return;
    }
    if (Private === "") {
        ErrorPriv.innerText = Text.SignIn_input_error_2;
        return;
    }

    Public = Base58.decode(Public);
    Private = Base58.decode(Private);

    document.getElementById("Work").innerHTML = "";

    let div = document.createElement("div");
    div.className = "row content content-inner";

    let div2 = document.createElement("div");
    div2.className = "left-bar";
    div.appendChild(div2);

    let div3 = document.createElement("div");
    div3.className = "account_field mb-50";
    div2.appendChild(div3);

    let h2 = document.createElement("h2");
    h2.className = "title";
    h2.innerText = Text.Acc_h2_1;
    div3.appendChild(h2);

    let div4 = document.createElement("div");
    div4.className = "hiddenly-ac hidden-acc";
    div3.appendChild(div4);

    let p = document.createElement("div");
    p.className = "font_w_600";
    p.innerText = Text.Acc_Desc_1;
    div4.appendChild(p);

    p = document.createElement("div");
    p.className = "breaked";
    p.id = "WalletKey";
    p.innerText = Base58.encode(Public);
    div4.appendChild(p);

    let a = document.createElement("a");
    a.className = "small-bbatton mb-20";
    a.innerText = "Copy";
    a.onclick = CopyWalletKey;
    div4.appendChild(a);


    //a = document.createElement("a");
    //a.className = "link";
    //a.onclick = UpdateBalance;
    //a.innerText = Text.Acc_Desc_11;
    //div4.appendChild(a);

    p = document.createElement("div");
    p.className = "font_w_600";
    div4.appendChild(p);

    a = document.createElement("a");
    a.className = "small-bbatton";
    a.innerText = Text.Acc_Desc_11;
    a.onclick = UpdateBalance;
    p.appendChild(a);


    let span = document.createElement("span");
    span.innerText = Text.Acc_Desc_2;
    p.appendChild(span);

    p = document.createElement("div");
    p.className = "breaked";
    p.id = "Balance";
    div4.appendChild(p);


    let table = document.createElement("table");
    table.className = "balance_table";
    p.appendChild(table);

    p = document.createElement("div");
    p.className = "slide-popup";
    p.id = "CoinMarketCap";
    p.innerText = "TRext";
    div4.appendChild(p);

    p = document.createElement("div");
    p.className = "font_w_600";
    p.innerText = Text.Acc_Desc_14;
    div4.appendChild(p);

    p = document.createElement("div");
    p.className = "breaked";
    p.id = "BalanceToken";
    div4.appendChild(p);

    table = document.createElement("table");
    table.className = "balance_table";
    p.appendChild(table);

    a = document.createElement("a");
    a.className = "small-bbatton-c";
    a.innerText = "Show More";
    a.onclick = ShowToken.bind(this);
    div4.appendChild(a);

    p = document.createElement("div");
    p.className = "breaked mb-20";
    div4.appendChild(p);

    p = document.createElement("div");
    div4.appendChild(p);

    a = document.createElement("a");
    a.className = "link";
    a.href = 'https://monitor.credits.com/' + Monitor + '/account/' + Base58.encode(Public);
    a.target = "_blank";
    a.id = "MonitorHistory";
    a.innerText = Text.Acc_Desc_3;
    p.appendChild(a);

    p = document.createElement("div");
    div4.appendChild(p);

    a = document.createElement("a");
    a.className = "link";
    a.onclick = RanderPayment;
    a.innerText = Text.Acc_Desc_13;
    p.appendChild(a);

    p = document.createElement("div");
    div4.appendChild(p);

    a = document.createElement("a");
    a.className = "link";
    a.onclick = RenderSmartContract;
    a.innerText = Text.Acc_Desc_10;
    p.appendChild(a);

    p = document.createElement("div");
    div4.appendChild(p);

    a = document.createElement("a");
    a.className = "link";
    a.onclick = RenderCreateToken;
    a.innerText = Text.Acc_Desc_12;
    p.appendChild(a);

    div2.appendChild(Faq());

    div2 = document.createElement("div");
    div2.className = "w-content";
    div.appendChild(div2);

    document.getElementById("Work").appendChild(div);
    switch (CallEv) {
        case "Token":
            RenderCreateToken();
            break;
        case "Smart":
            RenderSmartContract();
            break;
        default:
            RanderPayment();
    }

    UpdateBalance();
}

function ShowToken(ev) {
    let el = document.getElementById("BalanceToken");
    if (el !== undefined) {
        if (el.style.maxHeight === "") {
            el.style.maxHeight = "unset";
            ev.target.innerText = "Show Less";
        } else {
            el.style.maxHeight = "";
            ev.target.innerText = "Show More";
        }
    }
}

function CopyWalletKey() {
    let key = document.querySelector('#WalletKey');
    let range = document.createRange();
    range.selectNode(key);
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
        selection.removeAllRanges();
    }
    selection.addRange(range);
    console.log(document.execCommand('copy'));
    selection.removeAllRanges();
    OpenMiniInfoPopap();
}

function OpenMiniInfoPopap() {
    if (document.getElementById("MiniPopap") !== null) {
        CloseMiniInfoPopap();
    }

    let div = document.createElement("div");
    div.className = "micropopup";
    div.id = "MiniPopap";
    document.getElementsByTagName("body")[0].appendChild(div);

    let div2 = document.createElement("div");
    div2.className = "micro-title-row";
    div.appendChild(div2);

    let span = document.createElement("span");
    span.innerText = "X";
    span.onclick = CloseMiniInfoPopap;
    div2.appendChild(span);

    div2 = document.createElement("div");
    div2.className = "micro-text-row";
    div2.innerText = "Key copied to clipboard";
    div.appendChild(div2);

}

function CloseMiniInfoPopap() {
    document.getElementById("MiniPopap").remove();
}

function RenderCreateToken(Call) {
    let Text = Resourse();

    let el = document.getElementsByClassName("w-content")[0];
    el.innerText = "";

    let h2 = document.createElement("h2");
    h2.className = "title";
    h2.innerText = Text.CreateToken_h2_2;
    el.appendChild(h2);

    let p = document.createElement("div");
    p.className = "mb-20";
    p.innerText = Text.CreateToken_p_2;
    el.appendChild(p);

    p = document.createElement("p");
    p.innerText = "Your token's full name";
    el.appendChild(p);

    let input = document.createElement("input");
    input.className = "main-input";
    input.placeholder = "Name";
    input.id = "SmartName";
    el.appendChild(input);

    p = document.createElement("p");
    p.id = "SmartNameError";
    el.appendChild(p);

    p = document.createElement("p");
    p.innerText = "Ticker symbol (abbreviated name or label of the token)";
    el.appendChild(p);

    input = document.createElement("input");
    input.className = "main-input";
    input.placeholder = "Symbol";
    input.id = "Symbol";
    el.appendChild(input);

    p = document.createElement("p");
    p.id = "SymbolError";
    el.appendChild(p);

    p = document.createElement("p");
    p.innerText = "The number of characters after the dot (not more than 18 digits)";
    el.appendChild(p);

    input = document.createElement("input");
    input.className = "main-input";
    input.placeholder = "Decimal";
    input.id = "Decimal";
    el.appendChild(input);

    p = document.createElement("p");
    p.id = "DecimalError";
    el.appendChild(p);

    p = document.createElement("p");
    p.innerText = "Number of tokens (no more than 27 digits)";
    el.appendChild(p);

    input = document.createElement("input");
    input.className = "main-input";
    input.placeholder = "Token cost";
    input.id = "TokenCost";
    input.style = "display:none;";
    el.appendChild(input);

    input = document.createElement("input");
    input.className = "main-input";
    input.placeholder = "Total quantity";
    input.id = "TotalCoins";
    el.appendChild(input);

    p = document.createElement("p");
    p.id = "TotalCoinsError";
    el.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-50";
    p.innerText = "You can add the functionality of your token to an additional number of parameters not listed here. To do this, you will need to write them in the source code of the smart contract.";
    el.appendChild(p);

    let a = document.createElement("a");
    a.href = "https://developers.credits.com/en/Articles/a_Creating_tokens_smart_contract_on_the_Credits_standard";
    a.innerText = "Read more";
    a.className = "link";
    a.target = "_blank";
    p.appendChild(a);

    let div = document.createElement("div");
    div.className = "row mb-50";
    el.appendChild(div);

    let button = document.createElement("a");
    button.className = "link fo_link";
    button.onclick = RanderPayment;
    button.innerText = Text.CreateToken_button_1;
    div.appendChild(button);

    button = document.createElement("a");
    button.className = "bold-link bttn margin_left_60";
    button.innerText = "Create contract";
    button.onclick = CreateSmartToken;
    div.appendChild(button);
}

function CreateSmartToken() {
    let SmartNameError = document.getElementById("SmartNameError");
    SmartNameError.innerText = "";

    let SymbolError = document.getElementById("SymbolError");
    SymbolError.innerText = "";

    let DecimalError = document.getElementById("DecimalError");
    DecimalError.innerText = "";

    let TotalCoinsError = document.getElementById("TotalCoinsError");
    TotalCoinsError.innerText = "";

    let SmartName = document.getElementById("SmartName").value;
    let Symbol = document.getElementById("Symbol").value;
    let Decimal = document.getElementById("Decimal").value;
    let TokenCost = document.getElementById("TokenCost").value;
    let TotalCoins = document.getElementById("TotalCoins").value;

    if (SmartName === "") {
        SmartNameError.innerText = "Name must not be empty";
        return;
    }

    if (Symbol === "") {
        SymbolError.innerText = "Symbol must not be empty";
        return;
    }

    if (Decimal === "") {
        DecimalError.innerText = "Decimal must not be empty";
        return;
    }

    if (TotalCoins === "") {
        TotalCoinsError.innerText = "Total quantity must not be empty";
        return;
    }

    let Smart = `
import com.credits.scapi.v0.BasicStandard;
import com.credits.scapi.v0.SmartContract;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static java.math.BigDecimal.ROUND_DOWN;
import static java.math.BigDecimal.ZERO;

public class Token${Symbol} extends SmartContract implements BasicStandard {

    private final String owner;
    private final BigDecimal tokenCost;
    private final int decimal;
    HashMap<String, BigDecimal> balances;
    private String name;
    private String symbol;
    private BigDecimal totalCoins;
    private HashMap<String, Map<String, BigDecimal>> allowed;
    private boolean frozen;

    public Token${Symbol}() {
        super();
        name = "${SmartName}";
        symbol = "${Symbol}";
        decimal = ${Decimal === `` ? 0 : Decimal};
        tokenCost = new BigDecimal(${TokenCost === `` ? 0 : TokenCost}).setScale(decimal, ROUND_DOWN);
        totalCoins = new BigDecimal(${TotalCoins === `` ? 0 : TotalCoins}).setScale(decimal, ROUND_DOWN);
        owner = initiator;
        allowed = new HashMap<>();
        balances = new HashMap<>();
        balances.put(owner, new BigDecimal(${TotalCoins === `` ? 0 : TotalCoins}L).setScale(decimal, ROUND_DOWN));
    }

    @Override
    public int getDecimal() {
        return decimal;
    }

    @Override
    public boolean setFrozen(boolean isFrozen) {
        if (!initiator.equals(owner)) {
            throw new RuntimeException("unable change frozen state! The wallet " + initiator + " is not owner");
        }
        this.frozen = isFrozen;
        return true;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getSymbol() {
        return symbol;
    }

    @Override
    public String totalSupply() {
        return totalCoins.toString();
    }

    @Override
    public String balanceOf(String owner) {
        return getTokensBalance(owner).toString();
    }

    @Override
    public String allowance(String owner, String spender) {
        if (allowed.get(owner) == null) {
            return "0";
        }
        BigDecimal amount = allowed.get(owner).get(spender);
        return amount != null ? amount.toString() : "0";
    }

    @Override
    public boolean transfer(String to, String amount) {
        contractIsNotFrozen();
        if (!to.equals(initiator)) {
            BigDecimal decimalAmount = toBigDecimal(amount);
            if(decimalAmount.compareTo(ZERO) < 0) {
                throw new IllegalArgumentException("the amount cannot be negative");
            }
            BigDecimal sourceBalance = getTokensBalance(initiator);
            BigDecimal targetTokensBalance = getTokensBalance(to);
            if (sourceBalance.compareTo(decimalAmount) < 0) {
                throw new RuntimeException("the wallet " + initiator + " doesn't have enough tokens to transfer");
            }
            balances.put(initiator, sourceBalance.subtract(decimalAmount));
            balances.put(to, targetTokensBalance.add(decimalAmount));
        }
        return true;
    }

    @Override
    public boolean transferFrom(String from, String to, String amount) {
        contractIsNotFrozen();

        if (!from.equals(to)) {
            BigDecimal decimalAmount = toBigDecimal(amount);
            if(decimalAmount.compareTo(ZERO) < 0) {
                throw new IllegalArgumentException("the amount cannot be negative");
            }
            BigDecimal sourceBalance = getTokensBalance(from);
            BigDecimal targetTokensBalance = getTokensBalance(to);
            if (sourceBalance.compareTo(decimalAmount) < 0)
                throw new RuntimeException("unable transfer tokens! The balance of " + from + " less then " + amount);

            Map<String, BigDecimal> spender = allowed.get(from);
            if (spender == null || !spender.containsKey(initiator))
                throw new RuntimeException("unable transfer tokens! The wallet " + from + " not allow transfer tokens for " + to);

            BigDecimal allowTokens = spender.get(initiator);
            if (allowTokens.compareTo(decimalAmount) < 0) {
                throw new RuntimeException("unable transfer tokens! Not enough allowed tokens. For the wallet " + initiator + " allow only " + allowTokens + " tokens");
            }

            spender.put(initiator, allowTokens.subtract(decimalAmount));
            balances.put(from, sourceBalance.subtract(decimalAmount));
            balances.put(to, targetTokensBalance.add(decimalAmount));
        }
        return true;
    }

    @Override
    public void approve(String spender, String amount) {
        BigDecimal decimalAmount = toBigDecimal(amount);
        Map<String, BigDecimal> initiatorSpenders = allowed.get(initiator);
        if (initiatorSpenders == null) {
            Map<String, BigDecimal> newSpender = new HashMap<>();
            newSpender.put(spender, decimalAmount);
            allowed.put(initiator, newSpender);
        } else {
            BigDecimal spenderAmount = initiatorSpenders.get(spender);
            initiatorSpenders.put(spender, spenderAmount == null ? decimalAmount : spenderAmount.add(decimalAmount));
        }
    }

    @Override
    public boolean burn(String amount) {
        contractIsNotFrozen();
        BigDecimal decimalAmount = toBigDecimal(amount);
        if (!initiator.equals(owner))
            throw new RuntimeException("can not burn tokens! The wallet " + initiator + " is not owner");
        if (totalCoins.compareTo(decimalAmount) < 0) totalCoins = ZERO.setScale(decimal, ROUND_DOWN);
        else totalCoins = totalCoins.subtract(decimalAmount);
        return true;
    }

    public void payable(String amount, String currency) {
        contractIsNotFrozen();
        BigDecimal decimalAmount = toBigDecimal(amount);
        if (totalCoins.compareTo(decimalAmount) < 0) throw new RuntimeException("not enough tokes to buy");
        balances.put(initiator, Optional.ofNullable(balances.get(initiator)).orElse(ZERO).add(decimalAmount));
        totalCoins = totalCoins.subtract(decimalAmount);
    }

    private void contractIsNotFrozen() {
        if (frozen) throw new RuntimeException("unavailable action! The smart-contract is frozen");
    }

    private BigDecimal toBigDecimal(String stringValue) {
        return new BigDecimal(stringValue).setScale(decimal, ROUND_DOWN);
    }

    private BigDecimal getTokensBalance(String address) {
        return Optional.ofNullable(balances.get(address)).orElseGet(() -> {
            balances.put(address, ZERO.setScale(decimal, ROUND_DOWN));
            return  ZERO.setScale(decimal, ROUND_DOWN);
        });
    }
}`;

    let el = document.getElementsByClassName("w-content")[0];
    el.innerText = "";

    let Text = Resourse();

    let h2 = document.createElement("h2");
    h2.classList = "title";
    h2.innerText = Text.CreateToken_h2_1;
    el.appendChild(h2);

    let p = document.createElement("p");
    p.className = "mb-20";
    p.innerText = Text.CreateToken_p_1;
    el.appendChild(p);

    div = document.createElement("div");
    div.className = "mb-20";
    el.appendChild(div);

    let textarea = document.createElement("div");
    textarea.className = "text_area_fluid";
    //textarea.innerText = Smart;
    textarea.id = "SmartEditor";
    div.appendChild(textarea);



    div = document.createElement("div");
    div.className = "row mb-50";
    el.appendChild(div);

    let button = document.createElement("a");
    button.className = "link fo_link";
    button.innerText = Text.CreateToken_button_1;
    button.onclick = RenderCreateToken;
    div.appendChild(button);

    button = document.createElement("a");
    button.className = "bold-link bttn margin_left_60";
    button.innerText = Text.CreateToken_button_2;
    button.id = "TokenDeploy";
    button.onclick = DeployToken;
    div.appendChild(button);

    var editor = ace.edit("SmartEditor");
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/java");
    editor.setValue(Smart);
    editor.setOptions({
        wrap: true
    });
}

function RenderSmartContract(Call) {

    let Text = Resourse();

    let Cont = document.getElementsByClassName("w-content")[0];
    Cont.innerHTML = "";

    let h1 = document.createElement("h1");
    h1.className = "title 50";
    h1.innerText = Text.RenderSmartContract_h1_1;
    Cont.appendChild(h1);

    let button = document.createElement("a");
    button.className = "link mb-10";
    button.innerText = Text.RenderSmartContract_button_1;
    button.onclick = RanderPayment;
    Cont.appendChild(button);


    let div = document.createElement("div");
    div.className = "lblock";
    Cont.appendChild(div);

    let input = document.createElement("input");
    input.className = "main-input mb-10";
    input.placeholder = Text.RenderSmartContract_placeholder_1;
    input.onchange = SmartContractMetod;
    input.id = "PublicSmart";
    div.appendChild(input);

    let p = document.createElement("div");
    p.className = "smart__p no-margin";
    div.appendChild(p);

    let a = document.createElement("a");
    a.className = "bold-link bttn lupop";
    a.onclick = SmartContractMetod;
    p.appendChild(a);

    div = document.createElement("div");
    div.id = "Smart";
    Cont.appendChild(div);

}

function SmartContractMetod() {

    let PublicSmart = document.getElementById("PublicSmart").value;

    if (PublicSmart === "") {
        document.getElementById("Smart").innerHTML = "";
        return;
    }

    let Text = Resourse();


    SignCS.Connect().SmartContractDataGet(Base58.decode(PublicSmart), function (res) {
        if (res.methods.length > 0) {

            let div = document.getElementById("Smart");
            div.innerText = "";

            let p = document.createElement("p");
            p.className = "smart__p fontBold font_l_h_2 mb-10";
            p.innerText = Text.RenderSmartContract_p_1;
            div.appendChild(p);

            let select = document.createElement("select");
            select.className = "select mb-10";
            select.onchange = ArgSmartMethod;
            select.id = "Method";
            div.appendChild(select);

            for (let index in res.methods) {
                let option = document.createElement("option");
                option.text = res.methods[index].name;
                option.value = JSON.stringify(res.methods[index].arguments);
                option.setAttribute("ReType", res.methods[index].returnType);
                select.appendChild(option);
            }

            let div2 = document.createElement("div");
            div2.className = "wrap_fields";
            div.appendChild(div2);

            div2 = document.createElement("div");
            div2.className = "center_a p_bot20";
            div.appendChild(div2);

            let a = document.createElement("a");
            a.className = "link get_consult";
            a.innerText = Text.RenderSmartContract_button_2;
            div2.appendChild(a);

            div2 = document.createElement("div");
            div2.className = "row around mb-50";
            div.appendChild(div2);

            a = document.createElement("a");
            a.className = "bold-link bttn";
            a.innerText = Text.RenderSmartContract_button_3;
            a.onclick = Execute;
            div2.appendChild(a);


            document.getElementById("Method").onchange();
        } else {
            alert("Smart contract will not find or smart contrac don't have methods");
        }
    });

}

function ArgSmartMethod() {
    let el = document.getElementsByClassName("wrap_fields")[0];

    if (el !== undefined) {
        el.innerHTML = "";

        let select = document.getElementById("Method");
        let Value = select.options[select.selectedIndex].value;
        Value = JSON.parse(Value);


        for (let index in Value) {
            let p = document.createElement("p");
            p.innerText = Value[index].name;
            el.appendChild(p);

            let input = document.createElement("input");
            input.className = "main-input";
            input.setAttribute("NumArt", index);
            input.setAttribute("ParType", Value[index].type);
            el.appendChild(input);
        }
    }
}

function Execute() {
    let KeySmart = document.getElementById("PublicSmart").value;
    let method = document.getElementById("Method").options[document.getElementById("Method").selectedIndex].innerText;

    let paramEl = document.querySelectorAll("[numart]");
    let param = [];
    for (let index in paramEl) {
        if (paramEl[index].tagName === "INPUT") {
            switch (paramEl[index].attributes["ParType"].value) {
                case "java.lang.String":
                    param.push({ key: "STRING", value: paramEl[index].value });
                    break;
                case "double":
                    param.push({ key: "DOUBLE", value: paramEl[index].value });
                    break;
                case "int":
                    param.push({ key: "INT", value: paramEl[index].value });
                    break;
            }
        }
    }

    var Trans = SignCS.ConstructTransaction(SignCS.Connect(), {
        amount: 0.0,
        fee: 1.0,
        source: Public,
        Priv: Private,
        target: KeySmart,
        smart: {
            method: method,
            params: param,
            forgetNewState: false
        }
    });

    SignCS.Connect().TransactionFlow(Trans, function (res) {
        console.log(res);
        var mess = "message: " + res.status.message.split(" ")[0];
        if (res.smart_contract_result !== null) {
            if (res.smart_contract_result.v_bool !== null) {
                mess += "\n\rbool: " + res.smart_contract_result.v_bool;
            }
            if (res.smart_contract_result.v_double !== null) {
                mess += "\n\rdouble: " + res.smart_contract_result.v_double;
            }
            if (res.smart_contract_result.v_i8 !== null) {
                mess += "\n\ri8: " + res.smart_contract_result.v_i8;
            }
            if (res.smart_contract_result.v_i16 !== null) {
                mess += "\n\ri16: " + res.smart_contract_result.v_i16;
            }
            if (res.smart_contract_result.v_i32 !== null) {
                mess += "\n\ri32: " + res.smart_contract_result.v_i32;
            }
            if (res.smart_contract_result.v_i64 !== null) {
                mess += "\n\ri64: " + res.smart_contract_result.v_i64;
            }
            if (res.smart_contract_result.v_list !== null) {
                mess += "\n\rlist: " + res.smart_contract_result.v_list;
            }
            if (res.smart_contract_result.v_map !== null) {
                mess += "\n\rmap: " + res.smart_contract_result.v_map;
            }
            if (res.smart_contract_result.v_set !== null) {
                mess += "\n\rset: " + res.smart_contract_result.v_set;
            }
            if (res.smart_contract_result.v_string !== null) {
                mess += "\n\rstring: " + res.smart_contract_result.v_string;
            }
        }
        alert(mess);
    });
}

function RanderPayment() {
    let Text = Resourse();

    document.getElementsByClassName("w-content")[0].innerHTML = "";
    let div2 = document.getElementsByClassName("w-content")[0];

    h2 = document.createElement("h2");
    h2.className = "title";
    h2.innerText = Text.Acc_h2_2;
    div2.appendChild(h2);

    let p = document.createElement("div");
    p.className = "mb-20";
    p.innerText = Text.Acc_Desc_4;
    div2.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-10";
    p.innerText = Text.Acc_Desc_6;
    div2.appendChild(p);

    Options = {
        ListClass: "select mb-10",
        Id: "Currency",
        ListOptions: []
    };

    div2.appendChild(GetSelect(Options));

    let label = document.createElement("label");
    label.className = "d-block mb-10";
    label.innerText = Text.Acc_Desc_7;
    div2.appendChild(label);

    let input = document.createElement("input");
    input.className = "main-input";
    input.id = "Address";
    input.placeholder = Text.Acc_placeholder_1;
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorAddress";
    div2.appendChild(p);

    label = document.createElement("label");
    label.className = "d-block mb-10";
    label.innerText = Text.Acc_Desc_8;
    div2.appendChild(label);

    input = document.createElement("input");
    input.className = "main-input";
    input.id = "Amount";
    input.placeholder = Text.Acc_placeholder_2;
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorAmount";
    div2.appendChild(p);

    label = document.createElement("label");
    label.className = "d-block mb-10";
    label.innerText = Text.Acc_Desc_9;
    div2.appendChild(label);

    input = document.createElement("input");
    input.className = "main-input";
    input.id = "Fee";
    input.value = 0.01;
    input.placeholder = Text.Acc_placeholder_3;
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed mb-50";
    p.id = "ErrorFee";
    div2.appendChild(p);

    a = document.createElement("a");
    a.className = "bold-link bttn";
    a.innerText = Text.Acc_button_1;
    a.onclick = PreparingTransaction;
    div2.appendChild(a);

    UpdateBalance();
}

function Faq() {
    let Text = Resourse();

    let div = document.createElement("div");
    div.className = "faq_field";

    let h2 = document.createElement("h2");
    h2.className = "title main-text";
    h2.innerText = Text.FAQ_h2;
    div.appendChild(h2);

    let div2 = document.createElement("div");
    div2.className = "main-text hiddenly-ac hidden-faq";
    div.appendChild(div2);

    let a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_Accounts_and_Keyfiles";
    a.innerText = Text.FAQ_item_1;
    div2.appendChild(a);

    a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_How_to_use_Web_Wallet#Create%20a%20new%20account";
    a.innerText = Text.FAQ_item_2;
    div2.appendChild(a);

    a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_How_to_use_Web_Wallet#Sign%20in%20with%20a%20previously%20created%20user%20account";
    a.innerText = Text.FAQ_item_3;
    div2.appendChild(a);

    a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_Accounts_and_Keyfiles#Public%20and%20private%20keys";
    a.innerText = Text.FAQ_item_4;
    div2.appendChild(a);

    a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_Accounts_and_Keyfiles#Keyfile,%20what%20it%20is%20used%20for,%20how%20to%20create%20it";
    a.innerText = Text.FAQ_item_5;
    div2.appendChild(a);

    a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_How_to_use_Web_Wallet#Operations%20performed%20inside%20user%20wallet";
    a.innerText = Text.FAQ_item_6;
    div2.appendChild(a);

    return div;
}

function PreparingTransaction() {
    let ErrorAddress = document.getElementById("ErrorAddress");
    let ErrorAmount = document.getElementById("ErrorAmount");
    let ErrorFee = document.getElementById("ErrorFee");

    ErrorAddress.innerText = "";
    ErrorAmount.innerText = "";
    ErrorFee.innerText = "";

    let PublicTo = document.getElementById("Address").value;
    let Amount = document.getElementById("Amount").value;
    let Fee = document.getElementById("Fee").value;

    let Text = Resourse();

    if (PublicTo === "") {
        ErrorAddress.innerText = Text.Acc_input_1_error;
        return;
    }
    if (Amount === "") {
        ErrorAmount.innerText = Text.Acc_input_2_error;
        return;
    }
    if (Fee === "") {
        ErrorFee.innerText = Text.Acc_input_3_error;
        return;
    }

    let CurrencyEL = document.getElementById("Currency");
    let Currency = document.getElementById("Currency").value;
    let Code = CurrencyEL.options[CurrencyEL.selectedIndex].innerText.split("(")[1].split(")")[0];
    let Trans;
    if (Currency === "CS") {
        Trans = SignCS.CreateTransaction({
            Amount: Amount,
            Fee: document.getElementById("Fee").value,
            Source: Public,
            PrivateKey: Private,
            Target: PublicTo
        });
    } else {
        Trans = SignCS.CreateTransaction({
            Fee: document.getElementById("Fee").value,
            Source: Public,
            PrivateKey: Private,
            Target: Currency,
            SmartContract: {
                Method: "transfer",
                Params: [
                    { K: "STRING", V: PublicTo },
                    { K: "STRING", V: Amount.replace(/,/, '.') }
                ]
            }
        });
    }

    if (Trans.Result === null) {
        alert(Trans.Message);
        return;
    }

    Trans = Trans.Result;

    let div = document.getElementsByClassName("w-content")[0];
    div.innerHTML = "";

    let h2 = document.createElement("h2");
    h2.className = "title";
    h2.innerText = Text.ConfirmTrans_h2_1;
    div.appendChild(h2);

    let p = document.createElement("div");
    p.className = "mb-20 textColorRed";
    p.innerText = Text.ConfirmTrans_p_1;
    div.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-20";
    p.innerText = Text.ConfirmTrans_p_2;
    div.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-20";
    div.appendChild(p);

    let span = document.createElement("span");
    span.className = "fontBold line_left";
    span.innerText = PublicTo;
    p.appendChild(span);

    p = document.createElement("div");
    p.className = "mb-20";
    p.innerText = Text.ConfirmTrans_p_3;
    div.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-20";
    div.appendChild(p);

    span = document.createElement("span");
    span.className = "fontBold line_left";
    span.innerText = `${Amount} ${Code}`;
    p.appendChild(span);

    p = document.createElement("div");
    p.className = "mb-20";
    p.innerText = Text.ConfirmTrans_p_4;
    div.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-20";
    div.appendChild(p);

    span = document.createElement("span");
    span.className = "fontBold line_left";
    span.innerText = Fee + " CS";
    p.appendChild(span);

    let div2 = document.createElement("div");
    div2.className = "row mb-50";
    div.appendChild(div2);

    let button = document.createElement("a");
    button.className = "link fo_link";
    button.innerText = Text.ConfirmTrans_button_1;
    button.onclick = RanderPayment;
    div2.appendChild(button);

    button = document.createElement("a");
    button.className = "bold-link bttn margin_left_60";
    button.innerText = Text.ConfirmTrans_button_2;
    button.onclick = function () {
        ResultPayment(Trans, {
            Fee: Fee,
            PublicTo: PublicTo,
            Amount: Amount,
            Code: Code
        });
    };
    div2.appendChild(button);
}

function ResultPayment(Trans, Obj) {
    let Client = SignCS.Connect();
    Client.TransactionFlow(Trans, function (res) {

        let Text = Resourse();

        let div = document.getElementsByClassName("w-content")[0];
        div.innerHTML = "";

        let h1 = document.createElement("h1");
        h1.className = "title compressed";
        h1.innerText = Text.ResultPayment_h1_1;
        div.appendChild(h1);

        let p = document.createElement("div");
        p.className = "mb-50";
        p.innerText = Text.ResultPayment_p_1;
        div.appendChild(p);

        p = document.createElement("div");
        p.className = "mb-20";
        p.innerText = Text.ResultPayment_p_2;
        div.appendChild(p);

        let span = document.createElement("span");
        span.className = "fontBold line_left";
        span.innerText = Obj.PublicTo;
        p.appendChild(span);

        p = document.createElement("div");
        p.className = "mb-20";
        p.innerText = Text.ResultPayment_p_3;
        div.appendChild(p);

        span = document.createElement("span");
        span.className = "fontBold line_left";
        span.innerText = `${Obj.Amount} ${Obj.Code}`;
        p.appendChild(span);

        p = document.createElement("div");
        p.className = "mb-20";
        p.innerText = Text.ResultPayment_p_4;
        div.appendChild(p);

        span = document.createElement("span");
        span.className = "fontBold line_left";
        span.innerText = Obj.Fee + " CS";
        p.appendChild(span);

        p = document.createElement("div");
        p.className = "mb-20";
        div.appendChild(p);

        let a = document.createElement("a");
        a.className = "link";
        a.target = "_blank";
        a.href = "https://monitor.credits.com/" + Monitor + "/account/" + Base58.encode(Public);
        a.innerText = Text.ResultPayment_link_1;
        p.appendChild(a);

        p = document.createElement("div");
        p.className = "mb-40 fontBold";
        div.appendChild(p);

        let button = document.createElement("a");
        button.className = "bold-link bttn margin_top_20";
        button.innerText = Text.ResultPayment_button_1;
        button.onclick = RanderPayment;
        p.appendChild(button);
    });
}

function AddToken() {
    let SmartPublic = document.getElementById("SmartPublic").value;
    let SmartMnem = document.getElementById("SmartMnem").value;

    let Token = localStorage.getItem(Base58.encode(Public));
    if (Token === undefined) {
        Token = {};
        Token[SmartPublic] = SmartMnem;
    } else {
        Token = JSON.parse(Token);
        Token[SmartPublic] = SmartMnem;
    }
    localStorage.setItem(Base58.encode(Public), JSON.stringify(Token));

    RanderPayment();
}

function GetTokens() {
    let Token = localStorage.getItem(Base58.encode(Public));
    return JSON.parse(Token);
}

function UpdateBalance() {
    let Storag = {};

    let Client = SignCS.Connect();
    Client.WalletBalanceGet(Public, function (r) {
        Loader();
        let fraction = String(r.balance.fraction / Math.pow(10, 18)).split(".")[1];

        if (fraction === undefined)
            fraction = 0;

        Storag["CS"] = { balance: r.balance.integral + "." + fraction, Text: "Credits (CS)" };

        Client.TokenBalancesGet(Public, function (res) {
            for (var index in res.balances) {

                let Address = new Uint8Array(32);
                for (var j in res.balances[index].token) {
                    Address[j] = res.balances[index].token[j].charCodeAt();
                }
                Address = Base58.encode(Address);


                Storag[Address] = { balance: res.balances[index].balance, Text: res.balances[index].code };

            }
            RenderBalance(Storag);
            CloseLoader();
        });
    });
}

function RenderBalance(Storag) {
    var el = document.getElementById("Currency");
    if (el !== null) {
        el.innerText = "";
    }

    let children = document.getElementById("BalanceToken");
    if (children !== null) {
        children = children.children[0].innerText = "";
    }

    children = document.getElementById("Balance");
    if (children !== null) {
        children = children.children[0];
        children.innerText = "";
        var i = 0;
        for (var index in Storag) {

            InsertBalance(Storag[index].Text, Storag[index].balance, index, i);

            if (el !== null) {
                let option = document.createElement("option");
                option.value = index;
                if (Storag[index].Text === "Credits (CS)") {
                    option.innerText = Storag[index].Text;
                } else {
                    option.innerText = "Token (" + (Storag[index].Text === "" ? "T_" + i : Storag[index].Text) + ")";
                }
                document.getElementById("Currency").appendChild(option);
            }
            i++;
        }
    }
}

function InsertBalance(Name, Balance, Address, index) {
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.className = "one";
    td.innerText = Name;
    tr.appendChild(td);

    if (Address !== undefined) {
        if (Address === "CS") {
            tr.innerText = "";
            td = document.createElement("td");
            td.className = "one";
            tr.appendChild(td);

            let img = document.createElement("img");
            img.className = "img-icon-crc";
            img.src = "https://credits.com/Content/img/icons/favicon.ico";
            td.appendChild(img);

            let span = document.createElement("span");
            span.innerText = Name;
            td.appendChild(span);



            td = document.createElement("td");
            td.className = "two";
            tr.appendChild(td);

            let div = document.createElement("div");
            div.className = "arrow-row";
            td.appendChild(div);

            let div2 = document.createElement("div");
            div2.className = "local-el";
            div2.id = "Balance_number";
            div2.innerText = Balance;
            div.append(div2);

            div2 = document.createElement("div");
            div2.className = "arrow-top";
            div2.onclick = PopapCoinMarketCap;
            div.appendChild(div2);

            document.getElementById("Balance").children[0].appendChild(tr);
        } else {
            let a = document.createElement("a");
            a.href = "https://monitor.credits.com/" + Monitor + "/token/" + Address;
            a.className = "link";
            a.target = "_blank";
            td.innerText = "";
            td.appendChild(a);

            if (Name === "") {
                a.innerText = "T";
                let sub = document.createElement("sub");
                sub.innerText = index;
                a.appendChild(sub);
            } else {
                a.innerText = Name;
            }

            td = document.createElement("td");
            td.className = "two";
            td.innerText = Balance;
            tr.appendChild(td);

            document.getElementById("BalanceToken").children[0].appendChild(tr);
        }
    }
}

function PopapCoinMarketCap() {
    let el = document.getElementById("CoinMarketCap");
    if (el !== undefined) {
        if (el.style.display === "") {
            let Balance = document.getElementById("Balance_number");
            let req = new XMLHttpRequest();
            req.open("GET", "https://api.coinmarketcap.com/v1/ticker/credits/", true);
            req.send();
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    console.log(JSON.parse(req.responseText)[0]);
                    let res = JSON.parse(req.responseText)[0];

                    let table = document.createElement("table");

                    let tr = document.createElement("tr");
                    table.appendChild(tr);

                    let td = document.createElement("td");
                    td.innerText = res.price_usd * Balance.innerText;
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.innerText = " USD";
                    tr.appendChild(td);

                    tr = document.createElement("tr");
                    table.appendChild(tr);

                    td = document.createElement("td");
                    td.innerText = res.price_btc * Balance.innerText;
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.innerText = " BTC";
                    tr.appendChild(td);

                    el.innerText = "";
                    el.appendChild(table);
                    el.style.display = "block";
                }
            };
        } else {
            el.style.display = "";
        }
    }
}

function InputFile() {
    document.getElementById("KeyFile").click();
}

function CheckAmount(el) {
    while (/[^0-9|^\.]/.test(el.value)) {
        el.value = el.value.replace(/[^0-9|^\.]/, "");
    }
}

function GetSelect(Option) {
    var DefOption = {
        ListClass: "",
        Id: "",
        Name: "",
        ListOptions: [],
        change: null
    };

    for (var Index in DefOption) {
        if (Option[Index] === undefined)
            Option[Index] = DefOption[Index];
    }

    var ElSelect = document.createElement("select");
    ElSelect.className = Option.ListClass;
    ElSelect.id = Option.Id;
    ElSelect.name = Option.Name;

    if (Option.change !== null) {
        ElSelect.onchange = Option.change;
    }

    for (var index in Option.ListOptions) {
        var val = Option.ListOptions[index];
        var ElementOption = document.createElement("option");
        ElementOption.innerText = val.Text;
        ElementOption.value = val.Value;
        if (val.attr !== undefined) {
            for (var i in val.attr) {
                var v = val.attr[i];
                ElementOption.setAttribute(v.Name, v.Value);
            }
        }
        if (val.Selected)
            ElementOption.selected = val.Selected;
        ElSelect.appendChild(ElementOption);
    }
    return ElSelect;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires === "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function ReadFile() {
    var selectedFile = document.getElementById('KeyFile').files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("ErrorFileKey").innerText = "";

        var FileContent = e.target.result;
        var Obj;
        var Text = Resourse();

        try {
            Obj = JSON.parse(FileContent);
        } catch (e) {
            document.getElementById("ErrorFileKey").innerText = Text.SignIn_button_2_Error;
            return;
        }

        if (Obj.key.public === undefined || Obj.key.private === undefined) {
            document.getElementById("ErrorFileKey").innerText = Text.SignIn_button_2_Error;
            return;
        }

        document.getElementById("Public").value = Obj.key.public;
        document.getElementById("Private").value = Obj.key.private;


        document.getElementById("OpenAcc").click();
    };
    reader.readAsText(selectedFile);
}

function DownloadFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function Myconnect() {

    Thrift.TXHRTransport.prototype.flush = function (async, callback) {
        var self = this;
        if ((async && !callback) || this.url === undefined || this.url === '') {
            return this.send_buf;
        }

        var xreq = this.getXmlHttpRequestObject();

        if (xreq.overrideMimeType) {
            xreq.overrideMimeType('application/vnd.apache.thrift.json; charset=utf-8');
        }

        if (callback) {
            xreq.onreadystatechange =
                (function () {
                    var clientCallback = callback;
                    return function () {
                        if (this.readyState === 4 && this.status === 200) {
                            self.setRecvBuffer(this.responseText);
                            clientCallback();
                        }
                    };
                }());

            xreq.onerror =
                (function () {
                    var clientCallback = callback;
                    return function () {
                        clientCallback();
                    };
                }());

        }

        xreq.open('POST', this.url, !!async);

        Object.keys(self.customHeaders).forEach(function (prop) {
            xreq.setRequestHeader(prop, self.customHeaders[prop]);
        });

        if (xreq.setRequestHeader) {
            xreq.setRequestHeader('Accept', 'application/vnd.apache.thrift.json; charset=utf-8');
            xreq.setRequestHeader('Content-Type', 'application/vnd.apache.thrift.json; charset=utf-8');
        }

        try {
            xreq.send(this.send_buf);
        } catch (Ex) {
            alert("Node update");
            return;
        }
        if (async && callback) {
            return;
        }

        if (xreq.readyState !== 4) {
            throw 'encountered an unknown ajax ready state: ' + xreq.readyState;
        }

        if (xreq.status !== 200) {
            throw 'encountered a unknown request status: ' + xreq.status;
        }

        this.recv_buf = xreq.responseText;
        this.recv_buf_sz = this.recv_buf.length;
        this.wpos = this.recv_buf.length;
        this.rpos = 0;
    };
}




function DeployToken() {
    let smart = ace.edit("SmartEditor");

    smart = smart.getValue();

    let Trans = SignCS.CreateTransaction({
        Fee: "1.5",
        Source: Public,
        PrivateKey: Private,
        SmartContract: {
            Code: smart
        }
    });

    if (Trans.Result === null) {
        alert(Trans.Message);
        return;
    }


    SignCS.Connect().TransactionFlow(Trans.Result, function (r) {
        alert(r.status.message);
        if ("Success" === r.status.message.split(" ")[0]) {
            RanderPayment();
        }
    });
}

function PopapRegisterCheck() {
    let input1 = document.getElementById("CheckAllow1");
    let input2 = document.getElementById("CheckAllow2");

    if (input1.checked && input2.checked) {
        document.getElementById("RegisterAllow").classList.remove("disabled-bttn-awr");
    } else {
        document.getElementById("RegisterAllow").classList.add("disabled-bttn-awr");
    }
}

function PopapRegister() {
    let cont = document.createElement("div");
    cont.className = "popup-bg";

    let div = document.createElement("div");
    div.className = "popup-alert-wrap";
    cont.appendChild(div);

    let p = document.createElement("p");
    p.className = "big-awr";
    p.innerText = "Before you get started";
    div.appendChild(p);

    p = document.createElement("p");
    p.className = "small-awr";
    p.innerHTML = "Credits Wallet does not collect or store <br />any information about you.";
    div.appendChild(p);

    let hr = document.createElement("hr");
    hr.className = "hr-awr";
    div.appendChild(hr);

    p = document.createElement("p");
    p.className = "row-awr";
    div.appendChild(p);

    let input = document.createElement("input");
    input.className = "inp-awr";
    input.type = "checkbox";
    input.onclick = PopapRegisterCheck;
    input.id = "CheckAllow1";
    p.appendChild(input);

    let span = document.createElement("p");
    span.className = "mid-awr";
    span.innerText = "I accept that my funds are stored on this account and it is impossible to recover account access if it is lost.";
    p.appendChild(span);

    p = document.createElement("p");
    p.className = "row-awr";
    div.appendChild(p);

    input = document.createElement("input");
    input.className = "inp-awr";
    input.type = "checkbox";
    input.id = "CheckAllow2";
    input.onclick = PopapRegisterCheck;
    p.appendChild(input);

    span = document.createElement("span");
    span.className = "mid-awr";
    span.innerText = "I accept that the transfer of access keys or an access file to second parties can lead to theft of funds available on the account.";
    p.appendChild(span);

    let a = document.createElement("a");
    a.className = "bold-link bttn disabled-bttn-awr mb-20";
    a.innerText = "Send";
    a.id = "RegisterAllow";
    a.onclick = NewKey;
    div.appendChild(a);

    p = document.createElement("p");
    p.className = "re-awr";
    div.appendChild(p);

    a = document.createElement("a");
    a.className = "link_grey";
    a.innerText = "I do not approve";
    a.href = "http://wallet.credits.com";
    p.appendChild(a);

    document.getElementsByTagName("body")[0].appendChild(cont);
}

function Loader() {
    let Cont = document.getElementById("loader-container");
    if (Cont === null) {
        let Loader = document.createElement("div");
        Loader.className = "loader-layer";
        Loader.id = "loader-container";

        let Wraper = document.createElement("div");
        Wraper.className = "loader-wrap";
        Loader.appendChild(Wraper);

        let Inner = document.createElement("div");
        Inner.className = "loader-inner";
        Wraper.appendChild(Inner);

        let Label = document.createElement("div");
        Label.className = "loader-label";
        Label.innerText = "Loading...";
        Inner.appendChild(Label);

        let Animate = document.createElement("div");
        Animate.id = "loader-animate";
        Inner.appendChild(Animate);

        document.getElementsByTagName("body")[0].appendChild(Loader);
    }
}

function CloseLoader() {
    let Cont = document.getElementById("loader-container");
    if (Cont !== null) {
        Cont.remove();
    }
}