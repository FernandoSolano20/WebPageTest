var btnGenerateReport = document.getElementById("generate");
var urlsTextArea = document.getElementById("urls");
var numberRuns = document.getElementById("runs");
var tbodySummary = document.querySelector("#table-summary tbody");
var tables = document.getElementById("tables");
var metrics = [];
var pages = {};
var webPageTestUrl = [];


function makeRequestToWpt() {
    var optionUrls = urlsTextArea.value.split("\n");

    var urls = optionUrls.map(url => {
      return getWptApiUrlFromResult(url);
    });

    urls.forEach(url => {
      getMetricsFromWpt(url);
    });
}

function getMetricsFromWpt(url,time=0) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function saveAndDrawMetrics() {
        var data = null;
        if (this.readyState === this.DONE && this.status == 200) {
            data = JSON.parse(this.responseText);
            if (data.statusCode === 200) {
                drawTable(data);
                webPageTestUrl.push([getNamePage(data.data.url), data.data.summary]);
                metrics.push(data);
            } else {
                time += 5000;
                setTimeout(getMetricsFromWpt,time?time:0,url,time);
            }
        }
    });
    xhr.open("GET", url, true);
    xhr.send();
}

function drawTable(data) {
    var url = getNamePage(data.data.url);
    var urlPage = document.querySelector("[data-url='" + url + "']");
    if (!urlPage) {
        var table = document.createElement("table");
        table.setAttribute("data-url", url);
        tables.appendChild(table);

        var thead = document.createElement("thead");
        table.appendChild(thead);

        var trHead = document.createElement("tr");
        thead.appendChild(trHead);

        var th = document.createElement("th");
        th.setAttribute("colspan", "15");
        th.innerText = url;
        trHead.appendChild(th);

        var trHead1 = document.createElement("tr");
        thead.appendChild(trHead1);

        var thTti = document.createElement("th");
        thTti.innerText = "Time to Interactive";
        trHead1.appendChild(thTti);

        var thCSSBytes = document.createElement("th");
        thCSSBytes.innerText = "CSS Bytes";
        trHead1.appendChild(thCSSBytes);

        var thJSBytes = document.createElement("th");
        thJSBytes.innerText = "JS Bytes";
        trHead1.appendChild(thJSBytes);

        var thImageBytes = document.createElement("th");
        thImageBytes.innerText = "Image Bytes";
        trHead1.appendChild(thImageBytes);

        var thFully = document.createElement("th");
        thFully.innerText = "Fully Loaded";
        trHead1.appendChild(thFully);

        var thDOM = document.createElement("th");
        thDOM.innerText = "DOM Content Loaded";
        trHead1.appendChild(thDOM);

        var thDOMElements = document.createElement("th");
        thDOMElements.innerText = "DOM Elements";
        trHead1.appendChild(thDOMElements);

        var thLCP= document.createElement("th");
        thLCP.innerText = "Largest Contentful Paint";
        trHead1.appendChild(thLCP);

        var thRender = document.createElement("th");
        thRender.innerText = "Time to Start Render";
        trHead1.appendChild(thRender);

        var thFCP = document.createElement("th");
        thFCP.innerText = "First Contenful Paint";
        trHead1.appendChild(thFCP);


        var thTtfb = document.createElement("th");
        thTtfb.innerText = "TTFB";
        trHead1.appendChild(thTtfb);

        var thLoad = document.createElement("th");
        thLoad.innerText = "Load Time";
        trHead1.appendChild(thLoad);

        var thLoad = document.createElement("th");
        thLoad.innerText = "DOM Interactive";
        trHead1.appendChild(thLoad);

        var thCls = document.createElement("th");
        thCls.innerText = "CLS";
        trHead1.appendChild(thCls);

        var thTbt = document.createElement("th");
        thTbt.innerText = "TBT";
        trHead1.appendChild(thTbt);


        var tbody = document.createElement("tbody");
        table.appendChild(tbody);

        //TODO add elements

        urlPage = table;

        pages[url] = {};
        pages[url]["TTI"] = [];
        pages[url]["CSSBytes"] = [];
        pages[url]["JSBytes"] = [];
        pages[url]["ImageBytes"] = [];
        pages[url]["FullyLoaded"] = [];
        pages[url]["DOMContentLoaded"] = [];
        pages[url]["DomElements"] = [];
        pages[url]["LCP"] = [];
        pages[url]["Render"] = [];
        pages[url]["FCP"] = [];
        pages[url]["TTFB"] = [];
        pages[url]["LoadTime"] = [];
        pages[url]["DOMInteractive"] = [];
        pages[url]["CLS"] = [];
        pages[url]["TBT"] = [];
        

        //TODO para la mediana
    }
    var tableBody = urlPage.querySelector("tbody");
    var runs = data.data.runs;
    for (var run in runs) {

        var tr = document.createElement("tr");
        tableBody.appendChild(tr);

        var tdTTI = document.createElement("td");
        var tti = runs[run].firstView.TTIMeasurementEnd ? runs[run].firstView.TTIMeasurementEnd : 0;
        tdTTI.innerText = tti;
        pages[url]["TTI"].push(tti);
        tr.appendChild(tdTTI);

        var tdCSSBytes = document.createElement("td");
        var cssBytes = runs[run].firstView.breakdown.css.bytes ? runs[run].firstView.breakdown.css.bytes : 0;
        tdCSSBytes.innerText = cssBytes;
        pages[url]["CSSBytes"].push(cssBytes);
        tr.appendChild(tdCSSBytes);

        var tdJSBytes = document.createElement("td");
        var jsBytes = runs[run].firstView.breakdown.js.bytes ? runs[run].firstView.breakdown.js.bytes : 0;
        tdJSBytes.innerText = jsBytes;
        pages[url]["JSBytes"].push(jsBytes);
        tr.appendChild(tdJSBytes);

        var tdImageBytes = document.createElement("td");
        var imageBytes = runs[run].firstView.breakdown.image.bytes ? runs[run].firstView.breakdown.image.bytes : 0;
        tdImageBytes.innerText = imageBytes;
        pages[url]["ImageBytes"].push(imageBytes);
        tr.appendChild(tdImageBytes);

        var tdFullyLoaded = document.createElement("td");
        var fullyLoaded = runs[run].firstView.fullyLoaded ? runs[run].firstView.fullyLoaded : 0;
        tdFullyLoaded.innerText = fullyLoaded;
        pages[url]["FullyLoaded"].push(fullyLoaded);
        tr.appendChild(tdFullyLoaded);

        var tdDOMContentLoaded = document.createElement("td");
        var domContentLoaded = runs[run].firstView.domContentLoadedEventEnd
            ? runs[run].firstView.domContentLoadedEventEnd
            : 0;
        tdDOMContentLoaded.innerText = domContentLoaded;
        pages[url]["DOMContentLoaded"].push(domContentLoaded);
        tr.appendChild(tdDOMContentLoaded);

        var tdDomElements = document.createElement("td");
        var domElements = runs[run].firstView.domElements ? runs[run].firstView.domElements : 0;
        tdDomElements.innerText = domElements;
        pages[url]["DomElements"].push(domElements);
        tr.appendChild(tdDomElements);

        var tdLCP = document.createElement("td");
        var lcp = runs[run].firstView["chromeUserTiming.LargestContentfulPaint"]
            ? runs[run].firstView["chromeUserTiming.LargestContentfulPaint"]
            : 0;
        tdLCP.innerText = lcp;
        pages[url]["LCP"].push(lcp);
        tr.appendChild(tdLCP);

        var tdRender = document.createElement("td");
        var render = runs[run].firstView.render ? runs[run].firstView.render : 0;
        tdRender.innerText = render;
        pages[url]["Render"].push(render);
        tr.appendChild(tdRender);

        var tdFCP = document.createElement("td");
        var fcp = runs[run].firstView.firstContentfulPaint ? runs[run].firstView.firstContentfulPaint : 0;
        tdFCP.innerText = fcp;
        pages[url]["FCP"].push(fcp);
        tr.appendChild(tdFCP);

        var tdTtfb = document.createElement("td");
        var ttfb = runs[run].firstView.TTFB ? runs[run].firstView.TTFB : 0;
        tdTtfb.innerText = ttfb;
        pages[url]["TTFB"].push(ttfb);
        tr.appendChild(tdTtfb);

        var tdLoadTime = document.createElement("td");
        var loadTime = runs[run].firstView.loadTime ? runs[run].firstView.loadTime : 0;
        tdLoadTime.innerText = loadTime;
        pages[url]["LoadTime"].push(loadTime);
        tr.appendChild(tdLoadTime);

        var tdDomInteractive = document.createElement("td");
        var domInteractive = runs[run].firstView.domInteractive ? runs[run].firstView.domInteractive : 0;
        tdDomInteractive.innerText = domInteractive;
        pages[url]["DOMInteractive"].push(domInteractive);
        tr.appendChild(tdDomInteractive);

        var tdCls = document.createElement("td");
        var cls = runs[run].firstView["chromeUserTiming.CumulativeLayoutShift"] ?
            runs[run].firstView["chromeUserTiming.CumulativeLayoutShift"] :
            0;
        tdCls.innerText = cls;
        pages[url]["CLS"].push(cls);
        tr.appendChild(tdCls);

        var tdTbt = document.createElement("td");
        var tbt = runs[run].firstView.TotalBlockingTime ? runs[run].firstView.TotalBlockingTime : 0;
        tdTbt.innerText = tbt;
        pages[url]["TBT"].push(tbt);
        tr.appendChild(tdTbt);

        //TODO add metrics
        
        if (numberRuns.value * 3 == pages[url].TTFB.length) {
            drawSummaryTable(url,pages[url]);
        }
    }
}

function drawSummaryTable(url, page) {

    var tr = document.createElement("tr");
    tbodySummary.appendChild(tr);

    var tdName = document.createElement("td");
    tdName.innerText = url;
    tr.appendChild(tdName);

    for (var metrics in page) {
        var metric = page[metrics];
        var tdMetric = document.createElement("td");
        if (metrics != "CSSBytes" && metrics != "JSBytes" && metrics != "ImageBytes" && metrics != "DomElements" && metrics != "CLS") {
            for (var i = 0; i < metric.length; i++) {
                metric[i] /= 1000;
            }
        }
        tdMetric.innerText = median(metric);
        tr.appendChild(tdMetric);
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function getNamePage(url) {
    if (url.indexOf("/about/") >= 0 && url.indexOf("/builder/") >= 0) {
        return "BSP About";
    }
    if (url.indexOf("/reviews/") >= 0) {
        return "Reviews";
    }
    else if (url.indexOf("/community/") >= 0) {
        return "Community Detail";
    }
    else if (url.indexOf("/communities/") >= 0) {
        return "Community Results";
    }
    else if (url.indexOf("/custom-builder/") >= 0) {
        return "Custom Builder";
    }
    else if (url.indexOf("/custom-homes/") >= 0) {
        return "Custom Homes";
    }
    else if (url.indexOf("/homes/") >= 0) {
        return "Homes Results";
    }
    else if (url.indexOf("/manufactured/") >= 0) {
        return "Manufactured Results";
    }
    else if (url.indexOf("/plan/") >= 0 || url.indexOf("/plandetail/") >= 0) {
        console.log("es un plan!", url);
        return "Plan Detail";
    }
    else if (url.indexOf("/specdetail/") >= 0) {
        return "Spec Detail";
    }
    else if (url.indexOf("/basichome/") >= 0) {
        return "Basic home";
    }
    else if (url.indexOf("/basicdetail/") >= 0) {
        return "Basic detail";
    }
    else if (url.indexOf("/basichome/") >= 0) {
        return "Basic home";
    }
    else if (url.indexOf("/basiccommunity/") >= 0) {
        return "Basic Community";
    }
    else {
        return url;
    }
}

var median = function (arr) {
    var mid = Math.floor(arr.length / 2);
    var nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

function removeTrailingSlash(str) {
    if (str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}

function getWptApiUrlFromResult(url) {
    url = removeTrailingSlash(url);
    var host = "";
    if (url.indexOf("https://webpagetest.org/result/") > -1) {
        host = "https://webpagetest.org/result/";
    } else {
        host = "https://www.webpagetest.org/result/";
    }
    return url.replace(host, 'https://www.webpagetest.org/jsonResult.php?test=');
}

btnGenerateReport.addEventListener("click",makeRequestToWpt);