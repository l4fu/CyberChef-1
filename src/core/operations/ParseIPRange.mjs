/**
 * @author n1474335 [n1474335@gmail.com]
 * @author Klaxon [klaxon@veyr.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import {ipv4CidrRange, ipv4HyphenatedRange, ipv4ListedRange, ipv6CidrRange, ipv6HyphenatedRange, ipv6ListedRange} from "../lib/IP.mjs";

/**
 * Parse IP range operation
 */
class ParseIPRange extends Operation {

    /**
     * ParseIPRange constructor
     */
    constructor() {
        super();

        this.name = "Parse IP range";
        this.module = "Default";
        this.local="";
        this.description = "给定CIDR范围（例如,<code>10.0.0/24</code>）、连字符范围（例如：<code>0.0.1-10.0-1.0</code>）或IP和/或CIDR范围列表（以新行分隔）,此操作提供网络信息并枚举该范围内的所有IP地址<br><br>支持IPv6,但不会枚举。Given a CIDR range (e.g. <code>10.0.0.0/24</code>), hyphenated range (e.g. <code>10.0.0.0 - 10.0.1.0</code>), or a list of IPs and/or CIDR ranges (separated by a new line), this operation provides network information and enumerates all IP addresses in the range.<br><br>IPv6 is supported but will not be enumerated.";
        this.infoURL = "https://wikipedia.org/wiki/Subnetwork";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Include network info",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Enumerate IP addresses",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Allow large queries",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [
            includeNetworkInfo,
            enumerateAddresses,
            allowLargeList
        ] = args;

        // Check what type of input we are looking at
        const ipv4CidrRegex = /^\s*((?:\d{1,3}\.){3}\d{1,3})\/(\d\d?)\s*$/,
            ipv4RangeRegex = /^\s*((?:\d{1,3}\.){3}\d{1,3})\s*-\s*((?:\d{1,3}\.){3}\d{1,3})\s*$/,
            ipv4ListRegex = /^\s*(((?:\d{1,3}\.){3}\d{1,3})(\/(\d\d?))?(\n|$)(\n*))+\s*$/,
            ipv6CidrRegex = /^\s*(((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\4)::|:\b|(?![\dA-F])))|(?!\3\4)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4}))\/(\d\d?\d?)\s*$/i,
            ipv6RangeRegex = /^\s*(((?=.*::)(?!.*::[^-]+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\4)::|:\b|(?![\dA-F])))|(?!\3\4)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4}))\s*-\s*(((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\17)::|:\b|(?![\dA-F])))|(?!\16\17)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4}))\s*$/i,
            ipv6ListRegex = /^\s*((((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\4)::|:\b|(?![\dA-F])))|(?!\3\4)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4}))(\/(\d\d?\d?))?(\n|$)(\n*))+\s*$/i;
        let match;

        if ((match = ipv4CidrRegex.exec(input))) {
            return ipv4CidrRange(match, includeNetworkInfo, enumerateAddresses, allowLargeList);
        } else if ((match = ipv4RangeRegex.exec(input))) {
            return ipv4HyphenatedRange(match, includeNetworkInfo, enumerateAddresses, allowLargeList);
        } else if ((match = ipv4ListRegex.exec(input))) {
            return ipv4ListedRange(match, includeNetworkInfo, enumerateAddresses, allowLargeList);
        } else if ((match = ipv6CidrRegex.exec(input))) {
            return ipv6CidrRange(match, includeNetworkInfo);
        } else if ((match = ipv6RangeRegex.exec(input))) {
            return ipv6HyphenatedRange(match, includeNetworkInfo);
        } else if ((match = ipv6ListRegex.exec(input))) {
            return ipv6ListedRange(match, includeNetworkInfo);
        } else {
            throw new OperationError("Invalid input.\n\nEnter either a CIDR range (e.g. 10.0.0.0/24) or a hyphenated range (e.g. 10.0.0.0 - 10.0.1.0). IPv6 also supported.");
        }
    }

}


export default ParseIPRange;
