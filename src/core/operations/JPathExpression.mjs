/**
 * @author Matt C (matt@artemisbot.uk)
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import jpath from "jsonpath";
import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * JPath expression operation
 */
class JPathExpression extends Operation {

    /**
     * JPathExpression constructor
     */
    constructor() {
        super();

        this.name = "JPath expression";
        this.module = "Code";
        this.local="";
        this.description = "使用JPath查询从JSON对象提取信息。Extract information from a JSON object with a JPath query.";
        this.infoURL = "http://goessner.net/articles/JsonPath/";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Query",
                "type": "string",
                "value": ""
            },
            {
                "name": "Result delimiter",
                "type": "binaryShortString",
                "value": "\\n"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [query, delimiter] = args;
        let results,
            obj;

        try {
            obj = JSON.parse(input);
        } catch (err) {
            throw new OperationError(`Invalid input JSON: ${err.message}`);
        }

        try {
            results = jpath.query(obj, query);
        } catch (err) {
            throw new OperationError(`Invalid JPath expression: ${err.message}`);
        }

        return results.map(result => JSON.stringify(result)).join(delimiter);
    }

}

export default JPathExpression;
