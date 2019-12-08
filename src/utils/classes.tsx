class Classes {

  classes: Array<string> = []

  constructor(c?: string | Array<string>) {
    this.add(c)
  }

  add(c?: string | Array<string>): Classes {
    if (!c) return this
    const _c = Array.isArray(c) ? c : [c]
    this.classes = this.classes.concat(c)
    return this
  }

  join(): string {
    return this.classes.join(' ')
  }

  toString(): string {
    return this.join()
  }

}

export default function createClasses(c?: string | Array<string>) {
  return new Classes(c)
}