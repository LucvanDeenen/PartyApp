package com.basic.helloworld

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.basic.helloworld.ui.GameDetailsView
import com.basic.helloworld.ui.ActiveGamesView
import com.basic.helloworld.ui.HomeScreen
import com.basic.helloworld.ui.theme.PartyApp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PartyApp {
                val navController = rememberNavController()
                AppNavigation(navController)
            }
        }
    }
}

@Composable
fun AppNavigation(navController: NavHostController) {
    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(onNavigateToActiveGames = {
                navController.navigate("active_games")
            })
        }
        composable("active_games") {
            ActiveGamesView(
                onGameSelected = { game ->
                    navController.navigate("game_details/${game.id}")
                }
            )
        }
        composable("game_details/{gameId}") { backStackEntry ->
            val gameId = backStackEntry.arguments?.getString("gameId")
            if (gameId != null) {
                GameDetailsView(
                    gameId = gameId
                )
            }
        }
    }
}
