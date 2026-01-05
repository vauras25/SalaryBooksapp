# ----------------------------
# Google Play Services
# ----------------------------
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# Location Services
-keep class com.google.android.gms.location.** { *; }

# ----------------------------
# AndroidX
# ----------------------------
-keep class androidx.startup.** { *; }
-dontwarn androidx.startup.**

-keep class androidx.** { *; }
-dontwarn androidx.**

# ----------------------------
# React Native
# ----------------------------
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# ----------------------------
# Hermes
# ----------------------------
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**

# ----------------------------
# Kotlin (CRITICAL)
# ----------------------------
-keep class kotlin.Metadata { *; }
-dontwarn kotlin.**
