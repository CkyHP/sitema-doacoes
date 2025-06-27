from django.shortcuts import render
from .models import Doador, Alimento, Doacao, Cesta
from .serializers import DoadorSerializer, AlimentoSerializer, DoacaoSerializer, CestaSerializer
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction

ITENS_CESTA = {
            "Cesta Padrão": [
                {"nome": "Arroz", "quantidade": 5, "tipo": "grão", "unidade": "kg"},
                {"nome": "Feijão", "quantidade": 2, "tipo": "grão", "unidade": "kg"},
                {"nome": "Açúcar", "quantidade": 2, "tipo": "doce", "unidade": "kg"},
                {"nome": "Macarrão", "quantidade": 1, "tipo": "massa", "unidade": "kg"},
                {"nome": "Fubá", "quantidade": 1, "tipo": "farinha", "unidade": "kg"},
                {"nome": "Farinha de trigo", "quantidade": 1 , "tipo": "farinha", "unidade": "kg"},
                {"nome": "Farinha de mandioca", "quantidade": 1 , "tipo": "farinha", "unidade": "kg"},
                {"nome": "Café", "quantidade": 1, "tipo": "bebida", "unidade": "meio kg"},
                {"nome": "Sal", "quantidade": 1, "tipo": "tempero", "unidade": "kg"},
                {"nome": "Óleo", "quantidade": 1, "tipo": "oleo", "unidade": "unidade"},
                {"nome": "Goiabada", "quantidade": 1 , "tipo": "doce", "unidade": "unidade"},
                {"nome": "Molho de tomate (sache)", "quantidade": 2, "tipo": "molho", "unidade": "sache"},
                {"nome": "Leite em pó", "quantidade": 1, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Achocolatado", "quantidade": 1, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Mucilon/farinha láctea/aveia em flocos", "quantidade": 1, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Cream cracker", "quantidade": 1, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Rosquinha", "quantidade": 1, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Biscoito recheado", "quantidade": 2, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Gelatina", "quantidade": 2, "tipo": "doce", "unidade": "pacote"},
                {"nome": "Absorvente", "quantidade": 1, "tipo": "higiene", "unidade": "pacote"},
                {"nome": "Pasta dental", "quantidade": 1, "tipo": "higiene", "unidade": "unidade"},
                {"nome": "Sabonete", "quantidade": 3, "tipo": "higiene", "unidade": "unidade"},
                {"nome": "Detergente de pia", "quantidade": 1, "tipo": "limpeza", "unidade": "unidade"},
                {"nome": "Papel higiênico", "quantidade": 1, "tipo": "higiene", "unidade": "pacote"},
            ],
            "Cesta Família com mais crianças": [
                {"nome": "Arroz", "quantidade": 5, "tipo": "grão", "unidade": "kg"},
                {"nome": "Feijão", "quantidade": 2, "tipo": "grão", "unidade": "kg"},
                {"nome": "Açúcar", "quantidade": 2, "tipo": "doce", "unidade": "kg"},
                {"nome": "Macarrão", "quantidade": 1, "tipo": "massa", "unidade": "kg"},
                {"nome": "Fubá", "quantidade": 1, "tipo": "farinha", "unidade": "kg"},
                {"nome": "Farinha de trigo", "quantidade": 1, "tipo": "farinha", "unidade": "kg"},
                {"nome": "Farinha de mandioca", "quantidade": 1, "tipo": "farinha", "unidade": "kg"},
                {"nome": "Café", "quantidade": 1, "tipo": "bebida", "unidade": "meio kg"},
                {"nome": "Sal", "quantidade": 1, "tipo": "tempero", "unidade": "kg"},
                {"nome": "Óleo", "quantidade": 1, "tipo": "oleo", "unidade": "unidade"},
                {"nome": "Goiabada", "quantidade": 1, "tipo": "doce", "unidade": "unidade"},
                {"nome": "Miojo", "quantidade": 2, "tipo": "massa", "unidade": "pacote"},
                {"nome": "Molho de tomate (sache)", "quantidade": 2, "tipo": "molho", "unidade": "sache"},
                {"nome": "Leite em pó", "quantidade": 1, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Achocolatado", "quantidade": 1, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Mucilon/farinha láctea/aveia em flocos", "quantidade": 2, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Cream cracker", "quantidade": 1, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Maisena", "quantidade": 1, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Rosquinha", "quantidade": 1, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Biscoito recheado", "quantidade": 4, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Gelatina", "quantidade": 3, "tipo": "doce", "unidade": "pacote"},
                {"nome": "Absorvente", "quantidade": 1, "tipo": "higiene", "unidade": "pacote"},
                {"nome": "Pasta dental", "quantidade": 1, "tipo": "higiene", "unidade": "unidade"},
                {"nome": "Sabonete", "quantidade": 3, "tipo": "higiene", "unidade": "unidade"},
                {"nome": "Detergente de pia", "quantidade": 1, "tipo": "limpeza", "unidade": "unidade"},
                {"nome": "Papel higiênico", "quantidade": 1, "tipo": "higiene", "unidade": "pacote"},
            ],
            "Cesta Família em estado de miserabilidade": [
                {"nome": "Arroz", "quantidade": 5, "tipo": "grão", "unidade": "kg"},
                {"nome": "Feijão", "quantidade": 2, "tipo": "grão", "unidade": "kg"},
                {"nome": "Açúcar", "quantidade": 2, "tipo": "doce", "unidade": "kg"},
                {"nome": "Macarrão", "quantidade": 1, "tipo": "massa", "unidade": "kg"},
                {"nome": "Fubá", "quantidade": 1, "tipo": "farinha", "unidade": "kg"},
                {"nome": "Farinha de trigo", "quantidade": 1, "tipo": "farinha", "unidade": "kg"},
                {"nome": "Farinha de mandioca", "quantidade": 1, "tipo": "farinha", "unidade": "kg"},
                {"nome": "Café", "quantidade": 1, "tipo": "bebida", "unidade": "meio kg"},
                {"nome": "Sal", "quantidade": 1, "tipo": "tempero", "unidade": "kg"},
                {"nome": "Miojo", "quantidade": 2, "tipo": "massa", "unidade": "pacote"},
                {"nome": "Tempero para feijão", "quantidade": 1, "tipo": "tempero", "unidade": "pacote"},
                {"nome": "Mistura", "quantidade": 1, "tipo": "outro", "unidade": "unidade"},
                {"nome": "Óleo", "quantidade": 1, "tipo": "oleo", "unidade": "unidade"},
                {"nome": "Goiabada", "quantidade": 1, "tipo": "doce", "unidade": "unidade"},
                {"nome": "Molho de tomate (sache)", "quantidade": 2, "tipo": "molho", "unidade": "sache"},
                {"nome": "Leite em pó", "quantidade": 1, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Achocolatado", "quantidade": 1, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Mucilon/farinha láctea/aveia em flocos", "quantidade": 1, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Cream cracker", "quantidade": 1, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Rosquinha", "quantidade": 1, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Biscoito recheado", "quantidade": 2, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Gelatina", "quantidade": 2, "tipo": "doce", "unidade": "pacote"},
                {"nome": "Absorvente", "quantidade": 1, "tipo": "higiene", "unidade": "pacote"},
                {"nome": "Pasta dental", "quantidade": 1, "tipo": "higiene", "unidade": "unidade"},
                {"nome": "Sabonete", "quantidade": 3, "tipo": "higiene", "unidade": "unidade"},
                {"nome": "Detergente de pia", "quantidade": 1, "tipo": "limpeza", "unidade": "unidade"},
                {"nome": "Papel higiênico", "quantidade": 1, "tipo": "higiene", "unidade": "pacote"},
                {"nome": "Cloro", "quantidade": 1, "tipo": "limpeza", "unidade": "unidade"},
                {"nome": "Sabão em pó", "quantidade": 1, "tipo": "limpeza", "unidade": "pacote"},
                {"nome": "Sabão em pedra", "quantidade": 1, "tipo": "limpeza", "unidade": "unidade"},
                {"nome": "Desodorante ou leite de rosas", "quantidade": 1, "tipo": "higiene", "unidade": "unidade"},
                {"nome": "Kit shampoo + condicionador", "quantidade": 1, "tipo": "higiene", "unidade": "kit"},
                {"nome": "Esponja para lavar louça", "quantidade": 1, "tipo": "limpeza", "unidade": "unidade"},
            ],
            "Cesta de Natal": [
                {"nome": "Panetone", "quantidade": 1, "tipo": "doce", "unidade": "unidade"},
                {"nome": "Maionese (vidro)", "quantidade": 1, "tipo": "condimento", "unidade": "vidro"},
                {"nome": "Milho verde (lata)", "quantidade": 1, "tipo": "enlatado", "unidade": "lata"},
                {"nome": "Bombons (caixa)", "quantidade": 1, "tipo": "doce", "unidade": "caixa"},
                {"nome": "Coxa com sobrecoxa (kg)", "quantidade": 2, "tipo": "carne", "unidade": "kg"},
                {"nome": "Suco", "quantidade": 1, "tipo": "bebida", "unidade": "unidade"},
                {"nome": "Tempero para frango tipo sazon", "quantidade": 1, "tipo": "tempero", "unidade": "pacote"},
                {"nome": "Arroz", "quantidade": 5, "tipo": "grão", "unidade": "kg"},
                {"nome": "Feijão", "quantidade": 2, "tipo": "grão", "unidade": "kg"},
                {"nome": "Açúcar", "quantidade": 2, "tipo": "doce", "unidade": "kg"},
                {"nome": "Macarrão", "quantidade": 1, "tipo": "massa", "unidade": "kg"},
                {"nome": "Fubá", "quantidade": 1, "tipo": "farinha", "unidade": "kg"},
                {"nome": "Farinha de trigo", "quantidade": 1, "tipo": "farinha", "unidade": "kg"},
                {"nome": "Farinha de mandioca", "quantidade": 1, "tipo": "farinha", "unidade": "kg"},
                {"nome": "Café", "quantidade": 1, "tipo": "bebida", "unidade": "meio kg"},
                {"nome": "Sal", "quantidade": 1, "tipo": "tempero", "unidade": "kg"},
                {"nome": "Óleo", "quantidade": 1, "tipo": "oleo", "unidade": "unidade"},
                {"nome": "Goiabada", "quantidade": 1, "tipo": "doce", "unidade": "unidade"},
                {"nome": "Miojo", "quantidade": 2, "tipo": "massa", "unidade": "pacote"},
                {"nome": "Molho de tomate (sache)", "quantidade": 2, "tipo": "molho", "unidade": "sache"},
                {"nome": "Leite em pó", "quantidade": 1, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Achocolatado", "quantidade": 1, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Mucilon/farinha láctea/aveia em flocos", "quantidade": 2, "tipo": "bebida", "unidade": "pacote"},
                {"nome": "Cream cracker", "quantidade": 1, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Maisena", "quantidade": 1, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Rosquinha", "quantidade": 1, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Biscoito recheado", "quantidade": 4, "tipo": "biscoito", "unidade": "pacote"},
                {"nome": "Gelatina", "quantidade": 3, "tipo": "doce", "unidade": "pacote"},
                {"nome": "Absorvente", "quantidade": 1, "tipo": "higiene", "unidade": "pacote"},
                {"nome": "Pasta dental", "quantidade": 1, "tipo": "higiene", "unidade": "unidade"},
                {"nome": "Sabonete", "quantidade": 3, "tipo": "higiene", "unidade": "unidade"},
                {"nome": "Detergente de pia", "quantidade": 1, "tipo": "limpeza", "unidade": "unidade"},
                {"nome": "Papel higiênico", "quantidade": 1, "tipo": "higiene", "unidade": "pacote"},
            ],
        }


class DoadorViewSet(viewsets.ModelViewSet):
    queryset = Doador.objects.all()
    serializer_class = DoadorSerializer

class DoadorLoginView(APIView):
    def post(self, request):
        telefone = request.data.get('telefone')
        senha = request.data.get('senha')
        try:
            doador = Doador.objects.get(telefone=telefone, senha=senha)
            serializer = DoadorSerializer(doador)
            return Response(serializer.data)
        except Doador.DoesNotExist:
            return Response({'error': 'Telefone ou senha inválidos.'}, status=status.HTTP_400_BAD_REQUEST)

class AlimentoViewSet(viewsets.ModelViewSet):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer

    @action(detail=False, methods=['get'])
    def necessarios(self, request):
        alimentos = self.queryset.filter(quantidade_necessaria__gt = 0).order_by('quantidade_necessaria')
        serializer = self.get_serializer(alimentos, many=True)
        print(serializer.data)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def dar_baixa(self, request):
        """
        Recebe:
        {
            "nome": "Arroz",
            "quantidade": 2
        }
        """
        nome = request.data.get("nome")
        quantidade = request.data.get("quantidade")
        if not nome or not quantidade:
            return Response({"error": "Nome e quantidade são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            alimento = Alimento.objects.get(nome=nome)
            if alimento.quantidade_disponivel < quantidade:
                return Response({"error": "Estoque insuficiente."}, status=status.HTTP_400_BAD_REQUEST)
            alimento.quantidade_disponivel -= quantidade
            alimento.save()
            return Response({"status": "Baixa realizada com sucesso"})
        except Alimento.DoesNotExist:
            return Response({"error": "Alimento não encontrado."}, status=status.HTTP_404_NOT_FOUND)

class DoacaoViewSet(viewsets.ModelViewSet):
    queryset = Doacao.objects.all()
    serializer_class = DoacaoSerializer
    
    def atualizar_estoque(self, doacao):
        alimento = doacao.alimento
        alimento.quantidade_disponivel += doacao.quantidade
        alimento.quantidade_necessaria -= doacao.quantidade
        alimento.save()

    
    def perform_create(self, serializer):
        doacao = serializer.save()
        self.atualizar_estoque(doacao)

class CestaViewSet(viewsets.ModelViewSet):
    queryset = Cesta.objects.all()
    serializer_class = CestaSerializer

    @action(detail=False, methods=['post'])
    @transaction.atomic
    def atualizar_cestas(self, request):
        """
        Espera receber:
        [
            {"tipo": "Básica", "quantidade": 2},
            {"tipo": "Miserabilidade", "quantidade": 1},
            ...
        ]
        """
        dados = request.data
        # Atualiza ou cria as cestas
        necessidades = {}
        tipos_itens = {}
        unidades_itens = {}
        for cesta_info in dados:
            tipo = cesta_info["tipo"]
            quantidade = cesta_info["quantidade"]
            for item in ITENS_CESTA[tipo]:
                nome = item["nome"]
                qtd = item["quantidade"] * quantidade
                necessidades[nome] = necessidades.get(nome, 0) + qtd
                tipos_itens[nome] = item.get("tipo", "")
                unidades_itens[nome] = item.get("unidade", "")

        # 2. Atualiza ou cria os alimentos com a necessidade total, tipo e unidade
        for nome, qtd in necessidades.items():
            alimento, _ = Alimento.objects.get_or_create(nome=nome, defaults={
            "descricao": "",
            "quantidade_necessaria": 0,
            "quantidade_disponivel": 0,
            "tipo": tipos_itens.get(nome, ""),
            "unidade": unidades_itens.get(nome, ""),
            })
            alimento.quantidade_necessaria = qtd
            alimento.tipo = tipos_itens.get(nome, "")
            alimento.unidade = unidades_itens.get(nome, "")
            alimento.save()

        # 3. Zera ou remove alimentos que não são mais necessários
        for alimento in Alimento.objects.all():
            if alimento.nome not in necessidades:
                alimento.quantidade_necessaria = 0
                alimento.save()

        # 4. Atualiza as cestas
        for cesta_info in dados:
            tipo = cesta_info["tipo"]
            quantidade = cesta_info["quantidade"]
            cesta, created = Cesta.objects.get_or_create(tipo=tipo, defaults={"quantidade": quantidade})
            if not created:
                cesta.quantidade = quantidade
                cesta.save()

        return Response({"status": "Cestas e necessidades atualizadas"})
    
    @action(detail=False, methods=['post'])
    @transaction.atomic
    def dar_baixa_cesta(self, request):
        """
        Recebe:
        {
            "tipo": "Cesta Padrão",
            "alimentos": [
                {"nome": "Arroz", "quantidade": 5},
                {"nome": "Feijão", "quantidade": 2},
                ...
            ]
        }
        Se não enviar "alimentos", usa o padrão da cesta.
        """
        tipo = request.data.get("tipo")
        alimentos_recebidos = request.data.get("alimentos")

     
        if not tipo or tipo not in ITENS_CESTA:
            return Response({"error": "Tipo de cesta inválido."}, status=status.HTTP_400_BAD_REQUEST)

        if not alimentos_recebidos:
            alimentos_recebidos = ITENS_CESTA[tipo]

        erros = []
        for item in alimentos_recebidos:
            nome = item["nome"]
            qtd = item["quantidade"]
            try:
                alimento = Alimento.objects.get(nome=nome)
                if alimento.quantidade_disponivel < qtd:
                    erros.append(f"Estoque insuficiente para {nome}")
                else:
                    alimento.quantidade_disponivel -= qtd
                    alimento.save()
            except Alimento.DoesNotExist:
                erros.append(f"Alimento {nome} não encontrado")

        if erros:
            return Response({"status": "Baixa parcial", "erros": erros}, status=status.HTTP_207_MULTI_STATUS)
        return Response({"status": "Baixa realizada com sucesso"})
    
