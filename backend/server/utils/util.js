// eslint-disable-next-line import/prefer-default-export
export const colPick = (col, pickField) => col.map((i) => _.pick(i, [...pickField]))
