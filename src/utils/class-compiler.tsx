export default (className? : string | Array<string>, ...otherClassNames: Array<string>) => {
  return [
    ...(className ? (className instanceof Array ? className : "".split(/\s+/)) : []),
    ...otherClassNames
  ].filter((v, i, s) => s.indexOf(v) === i).join(" ")
}
