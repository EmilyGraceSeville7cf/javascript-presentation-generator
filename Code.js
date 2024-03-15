function main() {
  config = mergeDefaultConfigWithUserPreferences()
  throwIfConfigIsInvalid(config)

  const presentation = SlidesApp.create(config.general.name)

  const nonEmptySections = config.sections.filter(section => !isEmptySection(section)).length
  let sectionIndex = 1

  for (const section of config.sections) {
    if (isEmptySection(section)) {
      console.error(`Section '${section.name}' has been skipped because 'show' property is false for all of questions`)
      continue
    }

    addSection(presentation, section, sectionIndex / nonEmptySections)
    sectionIndex++
    console.log(`Section '${section.name}' has been created`)
  }

  presentation.getSlides()[0].remove()
  console.log(`Presentation URL: ${presentation.getUrl()}`)
}
