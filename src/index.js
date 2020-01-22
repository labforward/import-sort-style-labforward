"use strict";
const path = require("path");
const fs = require("fs");
const FIXED_ORDER = ["react", "react-redux", "redux", "prop-types"];

function isFixed(imported) {
  return FIXED_ORDER.indexOf(imported.moduleName) !== -1;
}

exports.default = importSort;
function importSort(styleApi) {
  const {
    alias,
    and,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isNodeModule,
    isRelativeModule,
    member,
    moduleName,
    naturally,
    unicode
  } = styleApi;

  const nodeModules = path.resolve(__dirname, "../../../node_modules");
  const modules = fs.readdirSync(nodeModules);

  function isFromNodeModules(imported) {
    return (
      modules.indexOf(imported.moduleName.split("/")[0]) !== -1 && // packages coming in from 'node_modules'
      !imported.moduleName.startsWith("react/") // components which we wrote but is under react namespace
    );
  }

  function fixedComparator(module1, module2) {
    var i1 = FIXED_ORDER.indexOf(module1);
    var i2 = FIXED_ORDER.indexOf(module2);

    i1 = i1 === -1 ? Number.MAX_SAFE_INTEGER : i1;
    i2 = i2 === -1 ? Number.MAX_SAFE_INTEGER : i2;

    return i1 === i2 ? naturally(module1, module2) : i1 - i2;
  }

  return [
    // import "foo"
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import "./foo"
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import … from "fs"; # native node modules
    {
      match: isNodeModule,
      sort: member(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // module which have fixed position (see FIXED_ORDER)
    {
      match: isFixed,
      sort: moduleName(fixedComparator),
      sortNamedMembers: alias(unicode)
    },

    // import uniq from 'lodash/uniq'; # modules from node_modules directory
    {
      match: isFromNodeModules,
      sort: member(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import … from "foo"; # modules with absolute path
    {
      match: isAbsoluteModule,
      sort: member(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import … from "./foo"; # modules with relative path
    // import … from "../foo";
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, member(naturally)],
      sortNamedMembers: alias(unicode)
    },
    { separator: true }
  ];
}
