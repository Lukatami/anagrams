import { useEffect } from "react";
import { useLeaderBoardStore } from "../../stores/leaderBoardStore";
import { usePlayerStore } from "../../stores/playerStore";

function LeaderBoard() {
  const { topList, myRank, isLoading, fetchLeaderBoards } =
    useLeaderBoardStore();
  const { isLoggedIn } = usePlayerStore();

  useEffect(() => {
    fetchLeaderBoards();
  }, []);

  if (isLoading)
    return (
      <div className="text-center text-white mt-8 text-lg">Loading...</div>
    );

  return (
    <div className="leaderboard w-full max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-red-500 drop-shadow-lg text-center">
        Leaderboard
      </h2>

      <div className="top-players flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-white mb-2">Top Players</h3>

        {topList?.map((player, index) => (
          <div
            className="player-card flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-3 shadow-lg"
            key={player._id}
          >
            #{index + 1}
            <img
              src={player.userAvatar}
              alt=""
              className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
            />
            <div className="flex flex-col text-white">
              <span className="font-semibold">{player.userName}</span>
              <span className="text-sm text-gray-200">
                Total Games: {player.totalGames || 0}
              </span>
              <span className="text-sm text-emerald-300">
                Total Score: {player.totalScore || 0}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isLoggedIn && myRank && (
        <div className="my-rank mt-6">
          <h3 className="text-xl font-semibold text-white mb-2">Your Rank</h3>
          <div className="player-card flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-3 shadow-lg">
            <span className="text-yellow-300 font-bold text-lg">
              #{myRank.rank}
            </span>
            <img
              src={myRank.player.userAvatar}
              alt=""
              className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
            />
            <div className="flex flex-col text-white">
              <span className="font-semibold">{myRank.player.userName}</span>
              <span className="text-sm text-gray-200">
                Total Games: {myRank.player.totalGames || 0}
              </span>
              <span className="text-sm text-emerald-300">
                Total Score: {myRank.player.totalScore || 0}
              </span>
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="text-center text-gray-300">Log in to see your rank</div>
      )}
    </div>
  );
}

export default LeaderBoard;
