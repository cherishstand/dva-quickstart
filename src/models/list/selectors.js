export function listSelector(state, ownProps) {
    const { itemsPerPage, activeType, lists, query, totalPage, current, next} = state.list;
    const ids = lists[activeType];
    return{
        activeType,
        ids,
        query,
        totalPage,
        current,
        next
    }
}
