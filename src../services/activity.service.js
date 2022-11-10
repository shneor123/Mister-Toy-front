import { toyService } from "./toy.service";
import { userService } from "./user.service";
import { utilService } from "./util.service";

export const activityService = {
    saveActivity,
}

async function saveActivity(activity, boardId) {
    const activityId = activity.id
    // var savedBoard
    if (activity.id) {
        let board = await toyService.getById(boardId)
        const idx = board.activities.findIndex(activity => activityId === activity.id)
        board.activities[idx].comment = activity.comment
        toyService.save(board)
        //     boardChannel.postMessage(getActionUpdateBoard(savedBoard))
        return board
    } else {
        activity.id = utilService.makeId()
        activity.byMember = userService.getLoggedinUser()
        activity.createdAt = Date.now()
        const board = await toyService.getById(boardId)
        board.activities.unshift(activity)
        toyService.save(board)
        // boardChannel.postMessage(getActionAddBoard(savedBoard))
        return board
    }
}