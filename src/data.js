const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `krot`,
    `yankigohome`
  ].sort(() => 0.5 - Math.random()).slice(0, Math.random() * (0 - 4) + 4)),
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random()))
});

const getAllTaskConfig = () => {
  const TASK_COUNT = 0;

  return new Array(TASK_COUNT).fill(``).map(getTask);
};

const allTaskConfig = getAllTaskConfig();

const getCountViewFilters = (config) => {
  const countAllFilters = new Set();
  let countFavoriteFilters = 0;
  let countArchiveFilters = 0;
  let countRepeatingFilters = 0;
  let countOverdueFilters = 0;
  let countTagFilters = 0;
  let countTodayFilters = 0;

  config.forEach(({isFavorite, isArchive, repeatingDays, dueDate, tags}) => {
    if (isFavorite) {
      countFavoriteFilters++;
    }

    if (isArchive) {
      countArchiveFilters++;
    }

    if (Object.values(repeatingDays).some((dayValue) => dayValue) === true) {
      countRepeatingFilters++;
    }

    if (tags.size > 0) {
      countTagFilters++;
    }

    if (dueDate < Date.now()) {
      countOverdueFilters++;
    }

    if (new Date().getDay() === new Date(dueDate).getDay()) {
      countTodayFilters++;
    }
  });

  countAllFilters.all = config.length;
  countAllFilters.favorites = countFavoriteFilters;
  countAllFilters.archive = countArchiveFilters;
  countAllFilters.repeating = countRepeatingFilters;
  countAllFilters.tags = countTagFilters;
  countAllFilters.overdue = countOverdueFilters;
  countAllFilters.today = countTodayFilters;

  return countAllFilters;
};

const getAllFiltersConfig = () => {
  const arrayFilters = [];
  const allNameFilters = new Set([
    `all`,
    `overdue`,
    `today`,
    `favorites`,
    `repeating`,
    `tags`,
    `archive`
  ]);
  const allCount = getCountViewFilters(allTaskConfig);

  for (let item of allNameFilters) {
    arrayFilters.push({title: item, count: allCount[item]});
  }

  return arrayFilters;
};

const allFilterConfig = getAllFiltersConfig();

export {allTaskConfig, allFilterConfig};
