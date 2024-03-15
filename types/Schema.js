/**
 * A JSON schema (draft 04).
 * 
 * @typedef Schema
 * 
 * @property {"http://json-schema.org/draft-04/schema#"} schema - A schema used for validation.
 * 
 * @property {string} title - A property title.
 * @property {string} description - A property description.
 *
 * @property {"object" | "null" | "number" | "integer" | "string" | "boolean" | "array"} type - A property type.
 * @property {number} minimum - A minimum property value.
 * @property {number} maximum - A maximum property value.
 * @property {number} exclusiveMinimum - An exclusive minimum property value.
 * @property {number} exclusiveMaximum - An exclusive maximum property value.
 * @property {number} minLength - A minimum property value length (range: 0..).
 * @property {number} maxLength - A maximum property value length (range: 0..).
 * @property {number} minLength - A minimum property value length (range: 0..).
 * @property {string} pattern - A pattern property value should match.
 * @property {"date" | "time" | "date-time" | "duration" | "regex" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "json-pointer" | "relative-json-pointer" | "uri" | "uri-reference" | "uri-template" | "uuid"} format - A format property value should match.
 * 
 * @property {number} minProperties - A minimum property count (range: 0..).
 * @property {number} maxProperties - A maximum property count (range: 0..).
 * @property {Array.<string>} required - Required properties (range: 0..).
 * @property {Object.<string, Array.<string> | Schema>} dependencies - Dependencies between properties.
 * @property {Object.<string, Schema>} properties - Nested properties.
 * @property {Object.<string, Schema>} patternProperties - Nested pattern properties.
 * @property {Object.<string, Schema>} additionalProperties - Nested additional properties or false if they are not allowed.
 * 
 * @property {number} minItems - A minimum array item count (range: 0..).
 * @property {number} maxItems - A maximum array item count (range: 0..).
 * @property {boolean} uniqueItems - Whether array items should be unique.
 * @property {Schema | Array.<Schema>} items - Array items.
 * @property {Object.<string, Schema>} additionalItems - Additional items or false if they are not allowed.
 *
 * @property {any} const - An allowed property value.
 * @property {Array} enum - Allowed property values.
 * @property {any} default - A default property value.
 * @property {Array} examples - Sample property values.
 * 
 * @property {Array.<Schema>} anyOf - Nested schemas where at least one should match.
 * @property {Array.<Schema>} oneOf - Nested schemas where one should match.
 * @property {Array.<Schema>} allOf - Nested schemas where all should match.
 * @property {Schema} not - Nested schema should not match.

 * 
 * @property {Object.<string, Schema>} definitions - Schemas.
 * @property {string} $ref - A reference.
 */

/**
 * A JSON schema validation result.
 *
 * @typedef SchemaValidationResult
 *
 * @property {boolean} valid - Whether validation succeeded.
 * @property {Array.<string>} errors - Validation errors.
 */
