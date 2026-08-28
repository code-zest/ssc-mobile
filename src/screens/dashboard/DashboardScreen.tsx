import React from 'react';
import { View, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function DashboardScreen({ navigation }: any) {
  const { user, logout } = useAuthStore();

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="mb-6 flex-row justify-between items-center mt-8">
        <View>
          <Text className="text-muted-foreground text-sm">Welcome back,</Text>
          <Text variant="display" weight="bold" className="text-2xl">{user?.firstName || 'Student'}</Text>
        </View>
        <Button variant="outline" size="sm" onPress={logout} label="Log Out" />
      </View>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Today's Goal</CardTitle>
          <CardDescription>You have 2 lessons left to complete your daily streak.</CardDescription>
        </CardHeader>
        <CardContent>
          <View className="h-3 w-full bg-secondary rounded-full overflow-hidden">
            <View className="h-full bg-primary w-1/3 rounded-full" />
          </View>
        </CardContent>
      </Card>

      <View className="flex-row justify-between items-center mb-4">
        <Text variant="display" weight="bold" className="text-xl">Recent Subjects</Text>
        <Button variant="ghost" size="sm" onPress={() => navigation.navigate('Learn')}>
          <Text className="text-primary font-semibold">View All</Text>
        </Button>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
        <View className="flex-row gap-4">
          <Card className="w-48 p-4">
            <View className="flex-row justify-between mb-3">
              <View className="h-10 w-10 bg-subject-quant/10 rounded-xl items-center justify-center">
                <Text className="text-xl">➗</Text>
              </View>
              <Badge variant="quant" label="Quant" />
            </View>
            <Text weight="bold" className="mb-1">Mathematics</Text>
            <Text className="text-xs text-muted-foreground">4 Chapters left</Text>
          </Card>
          
          <Card className="w-48 p-4">
            <View className="flex-row justify-between mb-3">
              <View className="h-10 w-10 bg-subject-reason/10 rounded-xl items-center justify-center">
                <Text className="text-xl">🧠</Text>
              </View>
              <Badge variant="reason" label="Reasoning" />
            </View>
            <Text weight="bold" className="mb-1">Logical Reasoning</Text>
            <Text className="text-xs text-muted-foreground">1 Chapter left</Text>
          </Card>
          
          <Card className="w-48 p-4">
            <View className="flex-row justify-between mb-3">
              <View className="h-10 w-10 bg-subject-english/10 rounded-xl items-center justify-center">
                <Text className="text-xl">📝</Text>
              </View>
              <Badge variant="english" label="English" />
            </View>
            <Text weight="bold" className="mb-1">English Comp.</Text>
            <Text className="text-xs text-muted-foreground">Completed</Text>
          </Card>
        </View>
      </ScrollView>
      
      <View className="mb-8">
        <Text variant="display" weight="bold" className="text-xl mb-4">Current Exams</Text>
        <View className="flex-row flex-wrap gap-2">
          <Badge variant="cgl" label="SSC CGL 2026" />
          <Badge variant="chsl" label="SSC CHSL" />
          <Badge variant="mts" label="SSC MTS" />
        </View>
      </View>

    </ScrollView>
  );
}
