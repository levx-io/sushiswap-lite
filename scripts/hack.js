const fs = require("fs");

const hack = (file, from, to) => {
    const path = "./node_modules/" + file;
    const original = fs.readFileSync(path, { encoding: "utf8" });
    const hacked = original.replace(from, to);
    fs.writeFileSync(path, hacked);
    console.log("Hacked " + path);
};

const argv = require("minimist")(process.argv.slice(2));
const platform = argv.p;

if (platform == "app") {
    hack("@ethersproject/providers/lib/websocket-provider.js", 'require("ws")', 'require("react-native").WebSocket');
    hack("xhr2-cookies/dist/xml-http-request.js", 'require("http")', 'require("node-libs-react-native").http');
    hack("xhr2-cookies/dist/xml-http-request.js", 'require("https")', 'require("node-libs-react-native").https');
    hack("xhr2-cookies/dist/xml-http-request.js", 'require("os")', 'require("node-libs-react-native").os');
    hack("xhr2-cookies/dist/xml-http-request.js", 'require("url")', 'require("node-libs-react-native").url');
    hack("xhr2-cookies/dist/xml-http-request.js", 'require("https")', 'require("node-libs-react-native").https');
    hack("cipher-base/index.js", "require('stream')", 'require("node-libs-react-native").stream');
    hack("keccak/lib/api/keccak.js", "require('stream')", 'require("node-libs-react-native").stream');
    hack("keccak/lib/api/keccak.js", 'require("stream")', 'require("node-libs-react-native").stream');
    hack("keccak/lib/api/shake.js", "require('stream')", 'require("node-libs-react-native").stream');
    hack("keccak/lib/api/shake.js", 'require("stream")', 'require("node-libs-react-native").stream');
    hack("@pedrouid/iso-crypto/dist/cjs/helpers/env/node.js", "require('crypto')", 'require("react-native-crypto-js")');
    hack("@pedrouid/iso-crypto/dist/cjs/helpers/env/node.js", 'require("crypto")', 'require("react-native-crypto-js")');
} else if (platform == "web") {
    hack("@ethersproject/providers/lib/websocket-provider.js", 'require("react-native").WebSocket', 'require("ws")');
    hack("xhr2-cookies/dist/xml-http-request.js", 'require("node-libs-react-native").http'), 'require("http")';
    hack("xhr2-cookies/dist/xml-http-request.js", 'require("node-libs-react-native").https'), 'require("https")';
    hack("xhr2-cookies/dist/xml-http-request.js", 'require("node-libs-react-native").os'), 'require("os")';
    hack("xhr2-cookies/dist/xml-http-request.js", 'require("node-libs-react-native").url'), 'require("url")';
    hack("xhr2-cookies/dist/xml-http-request.js", 'require("node-libs-react-native").https', 'require("https")');
    hack("cipher-base/index.js", 'require("node-libs-react-native").stream', "require('stream')");
    hack("keccak/lib/api/keccak.js", 'require("node-libs-react-native").stream', 'require("stream")');
    hack("keccak/lib/api/shake.js", 'require("node-libs-react-native").stream', "require('stream')");
    hack("@pedrouid/iso-crypto/dist/cjs/helpers/env/node.js", 'require("react-native-crypto-js")', "require('crypto')");
}
