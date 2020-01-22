# import-sort-style-labforward

A style for [import-sort](https://github.com/renke/import-sort) that is used
to enforce code standard within Labforward

```js
// Absolute modules with side effects (not sorted because order may matter)
import "a";
import "c";
import "b";

// Relative modules with side effects (not sorted because order may matter)
import "./a";
import "./c";
import "./b";

// Modules from the Node.js "standard" library sorted by member
import * as path from "path";
import { readFile, writeFile } from "fs";

// Third-party modules (from "node_modules") started with those which are fixed
// on a predefined sort order, followed by other modules sorted by member
import React from "react";
import { connect } from "react-redux";
import { createStore } from 'redux';
import PropTypes "prop-types";
import { Helmet } from "react-helmet";
import uniq from "lodash/uniq";

// First-party modules sorted by member
import aa from "aa";
import bb from "bb";
import cc from "cc";

// First-party modules sorted by "relative depth" and then by member
import aaa from "../../aaa";
import bbb from "../../bbb";
import aaaa from "../aaaa";
import bbbb from "../bbbb";
import aaaaa from "./aaaaa";
import bbbbb from "./bbbbb";
```
