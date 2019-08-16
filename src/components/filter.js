export const getFilterLayout = ({title, count}) => `
  <input
    type="radio"
    id="filter__${title}"
    class="filter__input visually-hidden"
    name="filter"
    ${count === 0 ? `disabled` : ``}
  />
  <label for="filter__${title}" class="filter__label">
    ${title} <span class="filter__${title}-count">${count}</span>
  </label>
</section>
`;
