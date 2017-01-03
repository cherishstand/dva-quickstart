export function listSelector(state, ownProps) {
    const { itemsPerPage, activePath, lists, query, totalPage, current, next} = state.list;
    const ids = lists[activePath];
    return{
        activePath,
        ids,
        query,
        totalPage,
        current,
        next
    }
}
