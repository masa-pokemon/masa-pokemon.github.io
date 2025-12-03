function FindProxyForURL(url, host) {

    // -------------------------------
    // 1. ホワイトリスト（DIRECT優先）
    // -------------------------------
    var whitelist = [
        "intranet.example.com",
        "masa-chat.web.app"
    ];

    for (var i = 0; i < whitelist.length; i++) {

        // IPレンジ
        if (whitelist[i].indexOf("/") > -1) {
            var parts = whitelist[i].split("/");
            if (isInNet(host, parts[0], prefixToMask(parts[1]))) {
                return "DIRECT";
            }
        }

        // ドメイン・ホスト名
        if (dnsDomainIs(host, whitelist[i]) || shExpMatch(host, whitelist[i])) {
            return "DIRECT";
        }
    }

    // -------------------------------
    // 2. ブラックリスト（強制 PROXY）
    // -------------------------------
    var blacklist = [
        "blocked.bad-site.com",
        "ads.tracker.net",
        "*.malware.com",
        "10.10.10.0/24"
    ];

    for (var j = 0; j < blacklist.length; j++) {

        // IPレンジ
        if (blacklist[j].indexOf("/") > -1) {
            var parts2 = blacklist[j].split("/");
            if (isInNet(host, parts2[0], prefixToMask(parts2[1]))) {
                return "PROXY proxy.example.com:8080";
            }
        }

        // ドメイン・ホスト名
        if (dnsDomainIs(host, blacklist[j]) || shExpMatch(host, blacklist[j])) {
            return "PROXY proxy.example.com:8080";
        }
    }

    // -------------------------------
    // 3. それ以外は通常プロキシ
    // -------------------------------
    return "PROXY proxy.example.com:8080; DIRECT";
}


// ----------------------------------------------------
// 補助: CIDRプレフィックスをサブネットマスクへ変換
// ----------------------------------------------------
function prefixToMask(prefix) {
    var bits = parseInt(prefix, 10);
    var mask = "";
    for (var i = 0; i < 4; i++) {
        var n = Math.min(8, bits);
        mask += (255 - (Math.pow(2, 8 - n) - 1));
        if (i < 3) mask += ".";
        bits -= n;
    }
    return mask;
}
