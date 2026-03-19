#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st){
    vec2 ipos=floor(st);
    vec2 fpos=fract(st);

    float a=dot(random2(ipos),fpos);
    float b=dot(random2(ipos+vec2(1.,0.)),fpos-vec2(1.,0.));
    float c=dot(random2(ipos+vec2(0.,1.)),fpos-vec2(0.,1.));
    float d=dot(random2(ipos+vec2(1.,1.)),fpos-vec2(1.,1.));

    vec2 u=smoothstep(0.,1.,fpos);

    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

vec2 rotate2D(vec2 st,float angle){
    st-=0.5;
    st=mat2(cos(angle),-sin(angle),
            sin(angle),cos(angle)) * st;
    st+=0.5;
    return st;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec2 mouse_correct=u_mouse.xy/u_resolution.xy;
    vec3 color=vec3(0.);

    float n1=noise(st*5.)*0.5+0.5;
    float n2=noise(st*10.)*0.5+0.5;
    float n3=noise(st*20.)*0.5+0.5;

    float n=mix(n1,n2,n3);

    vec3 color1=mix(vec3(1.,1.,0.),vec3(1.,0.5,0.),n1);
    vec3 color2=mix(vec3(1.,0.6,0.),vec3(1.,0.3,0.),n2);
    vec3 color3=mix(vec3(0.5,0.,0.),vec3(0.3,0.,0.),n3);

    color=mix(mix(color1,color2,n),color3,n);

    gl_FragColor=vec4(color,1.);
}