import React from 'react';

import { Linking, Text, View } from 'react-native';

import { DOCUMENTATION_LINKS } from '../constants/features';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useThemeColors } from '@/context/theme-context';

export const DocumentationCard: React.FC = React.memo(() => {
  const colors = useThemeColors();

  const titleStyle = {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 16,
  };

  const linkContainerStyle = {
    gap: 12,
  };

  const linkStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: 12,
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  };

  const linkTextStyle = {
    flex: 1,
    marginLeft: 12,
  };

  const linkTitleStyle = {
    fontSize: 16,
    fontWeight: '500' as const,
    color: colors.text,
    marginBottom: 4,
  };

  const linkDescriptionStyle = {
    fontSize: 14,
    color: colors.textSecondary,
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <Card variant="elevated" size="lg" style={{ marginBottom: 24 }}>
      <Card.Body>
        <Text style={titleStyle}>📚 Documentação</Text>
        <View style={linkContainerStyle}>
          {DOCUMENTATION_LINKS.map(link => (
            <Button
              key={link.title}
              variant="ghost"
              size="md"
              onPress={() => handleLinkPress(link.url)}
              style={linkStyle}
            >
              <Text style={{ fontSize: 20 }}>{link.icon}</Text>
              <View style={linkTextStyle}>
                <Text style={linkTitleStyle}>{link.title}</Text>
                <Text style={linkDescriptionStyle}>{link.description}</Text>
              </View>
            </Button>
          ))}
        </View>
      </Card.Body>
    </Card>
  );
});

DocumentationCard.displayName = 'DocumentationCard';
