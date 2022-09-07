from base64 import b64encode
from ast import literal_eval
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .workers import main


@csrf_exempt
def classify_spam(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        if message:
            res = main.classify_spam(message)
            return JsonResponse({
                "status": "ok",
                "result": res
            })

    return JsonResponse({
        "status": "error",
        "error": "Message is required"
    })


@csrf_exempt
def classify_image(request):
    if request.method == 'POST' and request.FILES:
        try:
            image = request.FILES['file']
            if image:
                img_b64 = b64encode(image.read())
                res = main.classify_image(img_b64)
                return JsonResponse({
                    "status": "ok",
                    "result": {
                        "class": res[0],
                        "confidence": res[1],
                    }
                })
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "error": str(e)
            })

    return JsonResponse({
        "status": "error",
        "error": "Image file is required"
    })


@csrf_exempt
def ocr(request):
    if request.method == 'POST' and request.FILES:
        try:
            image = request.FILES['file']
            if image:
                img_b64 = b64encode(image.read())
                res = main.ocr(img_b64)
                return JsonResponse({
                    "status": "ok",
                    "result": res
                })
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "error": str(e)
            })

    return JsonResponse({
        "status": "error",
        "error": "Image file is required"
    })


@csrf_exempt
def predict_heart_disease(request):
    if request.method == 'POST':
        data = request.POST.get('data')
        if data:
            try:
                data = literal_eval(data)
                if (len(data) == 14):
                    res = main.predict_heart_disease(data)
                    return JsonResponse({
                        "status": "ok",
                        "result": int(res)
                    })
                else:
                    return JsonResponse({
                        "status": "error",
                        "error": "Data array should be of length 14"
                    })
            except:
                return JsonResponse({
                    "status": "error",
                    "error": "Invalid data format"
                })

    return JsonResponse({
        "status": "error",
        "error": "Data is required"
    })
