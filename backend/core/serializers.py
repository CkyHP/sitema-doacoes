from .models import Doacao, Doador, Alimento, Cesta
from rest_framework import serializers

class DoadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doador
        fields = ['id', 'nome', 'telefone', 'is_membro', 'senha']

class AlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = ['id', 'nome', 'descricao', 'quantidade_necessaria', 'quantidade_disponivel', 'tipo', 'unidade', 'data_validade']

class DoacaoSerializer(serializers.ModelSerializer):
    # doador = DoadorSerializer(read_only=True)

    class Meta:
        model = Doacao
        fields = ['id', 'doador', 'alimento', 'data', 'quantidade', 'descricao']

class CestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cesta
        fields = ['id', 'tipo', 'quantidade']